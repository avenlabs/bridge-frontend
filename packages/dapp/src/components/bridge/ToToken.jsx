import {
  Box,
  Flex,
  Spinner,
  Switch,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import { AddToMetamask } from 'components/common/AddToMetamask';
import { Logo } from 'components/common/Logo';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { BigNumber, utils } from 'ethers';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { fetchToToken } from 'lib/bridge';
import {
  formatValue,
  getNativeCurrency,
  logError,
  truncateText,
} from 'lib/helpers';
import { fetchTokenBalance } from 'lib/token';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const ToToken = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isConnected, account } = useWeb3Context();
  const {
    bridgeDirection,
    enableForeignCurrencyBridge,
    foreignChainId,
    foreignMediatorAddress,
    homeWrappedForeignCurrencyAddress,
  } = useBridgeDirection();
  const {
    txHash,
    fromToken,
    toToken: token,
    toAmount: amount,
    toAmountLoading: loading,
    toBalance: balance,
    setToBalance: setBalance,
    shouldReceiveNativeCur,
    setShouldReceiveNativeCur,
    setToToken,
    setLoading,
  } = useBridgeContext();
  const { chainId } = token ?? {};

  const smallScreen = useBreakpointValue({ base: true, lg: false });
  const [balanceLoading, setBalanceLoading] = useState(false);

  const nativeCurrency = useMemo(
    () => getNativeCurrency(foreignChainId),
    [foreignChainId],
  );

  const changeToToken = useCallback(async () => {
    setLoading(true);
    setShouldReceiveNativeCur(!shouldReceiveNativeCur);
    setToToken(
      shouldReceiveNativeCur
        ? {
            ...fromToken,
            ...(await fetchToToken(bridgeDirection, fromToken, chainId)),
          }
        : { ...nativeCurrency, mediator: foreignMediatorAddress },
    );
    setLoading(false);
  }, [
    bridgeDirection,
    chainId,
    fromToken,
    nativeCurrency,
    setLoading,
    shouldReceiveNativeCur,
    setShouldReceiveNativeCur,
    setToToken,
    foreignMediatorAddress,
  ]);

  useEffect(() => {
    if (token && account) {
      (async () => {
        try {
          setBalanceLoading(true);
          const b = await fetchTokenBalance(token, account);
          setBalance(b);
        } catch (fromBalanceError) {
          setBalance(BigNumber.from(0));
          logError({ fromBalanceError });
        } finally {
          setBalanceLoading(false);
        }
      })();
    } else {
      setBalance(BigNumber.from(0));
    }
  }, [txHash, token, account, setBalance, setBalanceLoading]);

  return (
    <Flex
      align="center"
      position="relative"
      borderRadius="15px"
      bg={colorMode === 'dark' ? '#23232C' : '#F0F3F3'}
      p="20px"
    >
      {token && (
        <Flex w="100%" direction="column">
          <Flex
            justify="space-between"
            align={{ base: 'start', sm: 'center' }}
            mb={2}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex align="center">
              <Flex
                justify="center"
                align="center"
                background="white"
                border="1px solid #DAE3F0"
                w={8}
                h={8}
                overflow="hidden"
                borderRadius="50%"
                mr={2}
              >
                <Logo uri={token.logoURI} chainId={token.chainId} />
              </Flex>
              <Text fontSize="lg" fontWeight="bold">
                {truncateText(token.name, 20)}
              </Text>
              <AddToMetamask token={token} ml="0.5rem" asModal />
            </Flex>
            <Flex
              flex={1}
              justify="flex-end"
              align="center"
              h="100%"
              position="relative"
              display={isConnected ? 'flex' : 'none'}
              ml={{ base: undefined, sm: 2, md: undefined }}
            >
              {balanceLoading ? (
                <Spinner size="sm" color="grey" />
              ) : (
                <Flex
                  justify="flex-end"
                  align="center"
                  fontSize={{ base: 'md', lg: 'sm', '2xl': 'md' }}
                >
                  <Text color="grey" textAlign="right">
                    {`Balance: ${formatValue(balance, token.decimals)}`}
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            width="100%"
            justify="space-between"
            align={{ base: 'center', lg: 'flex-end', xl: 'center' }}
            flex={1}
          >
            {loading ? (
              <Box mt={{ base: 2, lg: 0 }} mb={{ base: 1, lg: 0 }}>
                <Spinner color="black" size="sm" />
              </Box>
            ) : (
              <Text fontWeight="bold" fontSize="2xl">
                {utils.formatUnits(amount, token.decimals)}
              </Text>
            )}
            {enableForeignCurrencyBridge &&
              chainId === foreignChainId &&
              fromToken.address.toLowerCase() ===
                homeWrappedForeignCurrencyAddress && (
                <Flex>
                  <Text>Receive {nativeCurrency.symbol}</Text>
                  <Switch
                    ml={2}
                    colorScheme="blue"
                    isChecked={shouldReceiveNativeCur}
                    onChange={changeToToken}
                  />
                </Flex>
              )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
