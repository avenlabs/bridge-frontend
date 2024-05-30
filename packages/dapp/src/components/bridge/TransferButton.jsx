import { Flex, Image, Text, useColorMode, useDisclosure, useToast } from '@chakra-ui/react';
import { captureMessage } from '@sentry/react';
import { ConfirmTransferModal } from 'components/modals/ConfirmTransferModal';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { utils } from 'ethers';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useNeedsClaiming } from 'hooks/useNeedsClaiming';
import { useTokenDisabled } from 'hooks/useTokenDisabled';
import { TransferIcon } from 'icons/TransferIcon';
import { formatValue, getNetworkName } from 'lib/helpers';
import React, { useCallback } from 'react';

export const TransferButton = ({ approval, isValid, tokenLimits }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isGnosisSafe, providerChainId, account } = useWeb3Context();
  const { bridgeDirection } = useBridgeDirection();
  const {
    receiver,
    fromAmount: amount,
    fromToken: token,
    fromBalance: balance,
    toAmountLoading,
  } = useBridgeContext();

  const { allowed } = approval;
  const needsClaiming = useNeedsClaiming();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const showError = useCallback(
    msg => {
      if (msg) {
        toast({
          title: 'Error',
          description: msg,
          status: 'error',
          isClosable: 'true',
        });
      }
    },
    [toast],
  );
  const isBridgingDisabled = useTokenDisabled(token);
  const buttonEnabled =
    !!token && allowed && !toAmountLoading && !isBridgingDisabled && isValid;

  const valid = useCallback(() => {
    if (!providerChainId) {
      showError('Please connect wallet');
    } else if (providerChainId !== token?.chainId) {
      showError(`Please switch to ${getNetworkName(token?.chainId)}`);
    } else if (
      tokenLimits &&
      (amount.gt(tokenLimits.remainingLimit) ||
        tokenLimits.remainingLimit.lt(tokenLimits.minPerTx))
    ) {
      showError(
        'Daily limit reached. Please try again tomorrow or with a lower amount',
      );
      captureMessage(
        `Daily limit reached - ${bridgeDirection.toUpperCase()} - 0x${token.chainId.toString(
          16,
        )} - ${token.symbol} - ${token.address}`,
        {
          tags: {
            debugMode: process.env.REACT_APP_DEBUG_LOGS === 'true',
            bridgeDirection,
            userAddress: account,
            receiverAddress: receiver || account,
            isGnosisSafe: isGnosisSafe ?? false,
            tokenAddress: token.address,
            tokenChainId: token.chainId,
            tokenSymbol: token.symbol,
            tokenAmount: amount.toString(),
            userBalance: balance.toString(),
            ...Object.fromEntries(
              Object.entries(tokenLimits).map(([key, value]) => [
                key,
                value.toString(),
              ]),
            ),
          },
        },
      );
    } else if (tokenLimits && amount.lt(tokenLimits.minPerTx)) {
      showError(
        `Please specify amount more than ${formatValue(
          tokenLimits.minPerTx,
          token.decimals,
        )}`,
      );
    } else if (tokenLimits && amount.gt(tokenLimits.maxPerTx)) {
      showError(
        `Please specify amount less than ${formatValue(
          tokenLimits.maxPerTx,
          token.decimals,
        )}`,
      );
    } else if (balance.lt(amount)) {
      showError('Not enough balance');
    } else if (receiver ? !utils.isAddress(receiver) : isGnosisSafe) {
      showError(`Please specify a valid recipient address`);
    } else {
      return true;
    }
    return false;
  }, [
    providerChainId,
    tokenLimits,
    token,
    amount,
    balance,
    receiver,
    isGnosisSafe,
    account,
    showError,
    bridgeDirection,
  ]);

  const onClick = () => {
    if (buttonEnabled && valid()) {
      onOpen();
    }
  };

  const bgButton = colorMode === 'dark' ? '#FFFFFF' : '#030202'

  return (
    <Flex
      as="button"
      align="center"
      // mt={{ base: 2, md: 2, lg: 3 }}
      color={!buttonEnabled ? '#8F60FF' : '#ffffff'}
      bg={!buttonEnabled ? bgButton : '#8F60FF'}
      _hover={
        !buttonEnabled
          ? undefined
          : {
              color: needsClaiming ? '#ffffff' : '#ffffff',
            }
      }
      cursor={!buttonEnabled ? 'not-allowed' : 'pointer'}
      transition="0.25s"
      position="relative"
      opacity={!buttonEnabled ? 1 : 1}
      onClick={onClick}
      borderRadius="42px"
      // w={{ base: '10rem', sm: '12rem', lg: 'auto' }}
      flex={1}
      p="12px"
    >
      <ConfirmTransferModal isOpen={isOpen} onClose={onClose} />
      <Flex
        // position="absolute"
        w="100%"
        // h="100%"
        justify="center"
        align="center"
      >
        <Text fontWeight="bold">
          {needsClaiming ? 'Request' : 'Transfer'}
        </Text>
        <TransferIcon width='16px' height='10px' ml={2} />
      </Flex>
    </Flex>
  );
};
