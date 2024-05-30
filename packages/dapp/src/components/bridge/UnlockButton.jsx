import { Flex, Image, Link, Spinner, Text, useColorMode, useToast } from '@chakra-ui/react';
import { TxLink } from 'components/common/TxLink';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useTokenDisabled } from 'hooks/useTokenDisabled';
import { UnlockIcon } from 'icons/UnlockIcon';
import { isRevertedError } from 'lib/amb';
import { getNetworkName, handleWalletError } from 'lib/helpers';
import React, { useCallback } from 'react';

export const UnlockButton = ({ approval, isValid }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { providerChainId } = useWeb3Context();
  const {
    fromAmount: amount,
    fromBalance: balance,
    fromToken: token,
    toAmountLoading,
  } = useBridgeContext();

  const { allowed, approve, unlockLoading, approvalTxHash } = approval;
  const isBridgingDisabled = useTokenDisabled(token);
  const buttonDisabled =
    !token || allowed || toAmountLoading || isBridgingDisabled || !isValid;
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
  const valid = useCallback(() => {
    if (!providerChainId) {
      showError('Please connect wallet');
      return false;
    }
    if (providerChainId !== token?.chainId) {
      showError(`Please switch to ${getNetworkName(token?.chainId)}`);
      return false;
    }
    if (amount.lte(0)) {
      showError('Please specify amount');
      return false;
    }
    if (balance.lt(amount)) {
      showError('Not enough balance');
      return false;
    }
    return true;
  }, [providerChainId, token?.chainId, amount, balance, showError]);

  const onClick = useCallback(() => {
    if (!unlockLoading && !buttonDisabled && valid()) {
      approve().catch(error => {
        if (error && error.message) {
          if (
            isRevertedError(error) ||
            (error.data &&
              (error.data.includes('Bad instruction fe') ||
                error.data.includes('Reverted')))
          ) {
            showError(
              <Text>
                There is problem with the token unlock. Try to revoke previous
                approval if any on{' '}
                <Link
                  href="https://revoke.cash"
                  textDecor="underline"
                  isExternal
                >
                  https://revoke.cash/
                </Link>{' '}
                and try again.
              </Text>,
            );
          } else {
            handleWalletError(error, showError);
          }
        } else {
          showError(
            'Impossible to perform the operation. Reload the application and try again.',
          );
        }
      });
    }
  }, [unlockLoading, buttonDisabled, valid, showError, approve]);

  const bgButton = colorMode === 'dark' ? '#FFFFFF' : '#030202'

  return (
    <Flex
      align="center"
      as="button"
      color={buttonDisabled ? '#8F60FF' : '#ffffff'}
      bg={buttonDisabled ? bgButton : '#8F60FF'}
      _hover={
        buttonDisabled
          ? undefined
          : {
              color: '#ffffff',
            }
      }
      cursor={buttonDisabled ? 'not-allowed' : 'pointer'}
      transition="0.25s"
      position="relative"
      opacity={buttonDisabled ? 1 : 1}
      onClick={onClick}
      borderRadius="42px"
      flex={1}
      p="12px"
    >
      <Flex
        w="100%"
        h="100%"
        justify="center"
        align="center"
      >
        {unlockLoading ? (
          <TxLink chainId={providerChainId} hash={approvalTxHash}>
            <Spinner size="sm" />
          </TxLink>
        ) : (
          <>
            <Text fontWeight="bold">
              {buttonDisabled ? 'Unlocked' : 'Unlock'}
            </Text>
            <UnlockIcon width="12px" height="16px" ml={2} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
