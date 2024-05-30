import {
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import DropDown from 'assets/drop-down.svg';
import { AddToMetamask } from 'components/common/AddToMetamask';
import { Logo } from 'components/common/Logo';
import { SelectTokenModal } from 'components/modals/SelectTokenModal';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { BigNumber, utils } from 'ethers';
import { formatValue, logError, truncateText } from 'lib/helpers';
import { fetchTokenBalance } from 'lib/token';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const useDelay = (fn, ms) => {
  const timer = useRef(0);

  const delayCallBack = useCallback(
    (...args) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(fn.bind(this, ...args), ms || 0);
    },
    [fn, ms],
  );

  return delayCallBack;
};

export const FromToken = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isConnected, account } = useWeb3Context();
  const {
    txHash,
    fromToken: token,
    fromBalance: balance,
    setFromBalance: setBalance,
    setAmount,
    amountInput: input,
    setAmountInput: setInput,
  } = useBridgeContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const smallScreen = useBreakpointValue({ base: true, lg: false });
  const [balanceLoading, setBalanceLoading] = useState(false);
  const updateAmount = useCallback(() => setAmount(input), [input, setAmount]);
  const delayedSetAmount = useDelay(updateAmount, 500);

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
      <SelectTokenModal onClose={onClose} isOpen={isOpen} />
      {token && (
        <Flex w="100%" direction="column">
          <Flex
            justify="space-between"
            align={{ base: 'start', sm: 'center' }}
            mb={2}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex align="center" cursor="pointer" onClick={onOpen} zIndex={1}>
              <Flex
                justify="center"
                align="center"
                background="white"
                border="1px solid #DAE3F0"
                boxSize={8}
                overflow="hidden"
                borderRadius="50%"
              >
                <Logo uri={token.logoURI} chainId={token.chainId} />
              </Flex>
              <Text fontSize="lg" fontWeight="bold" mx={2}>
                {truncateText(token.name, 20)}
              </Text>
              <Image src={DropDown} cursor="pointer" />
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
                <Text
                  color="grey"
                  textAlign="right"
                  fontSize={{ base: 'md', lg: 'sm', '2xl': 'md' }}
                >
                  {`Balance: ${formatValue(balance, token.decimals)}`}
                </Text>
              )}
            </Flex>
          </Flex>
          <Flex align="flex-end" flex={1} w="100%">
            <Input
              flex={1}
              variant="unstyled"
              type="text"
              value={input}
              placeholder="0.0"
              textAlign="left"
              fontWeight="bold"
              fontSize="2xl"
              borderRadius={0}
              lang="en-US"
              // color="#1A202C"
              onKeyPress={e => {
                if (e.key === '.') {
                  if (e.target.value.includes('.')) {
                    e.preventDefault();
                  }
                } else if (Number.isNaN(Number(e.key))) {
                  e.preventDefault();
                }
              }}
              onKeyUp={delayedSetAmount}
              onChange={e => setInput(e.target.value)}
            />
            <Button
              ml={2}
              color="#ffffff"
              bg="#8F60FF"
              size="sm"
              fontSize="sm"
              fontWeight="normal"
              borderRadius="23px"
              _hover={{ bg: '#8F60FF' }}
              onClick={() => {
                const amountInput = utils.formatUnits(balance, token.decimals);
                setAmount(amountInput);
                setInput(amountInput);
              }}
            >
              Max
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
