import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useWeb3Context } from 'contexts/Web3Context';
import { useClaim } from 'hooks/useClaim';
import { isRevertedError, TOKENS_CLAIMED } from 'lib/amb';
import { handleWalletError, logError } from 'lib/helpers';
import React, { useCallback, useState } from 'react';

export const ManualClaim = ({ handleClaimError }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isConnected } = useWeb3Context();
  const [txHash, setTxHash] = useState('');
  const [loading, setLoading] = useState(false);
  const { claim, executing } = useClaim();

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

  const claimTokens = useCallback(async () => {
    if (!txHash) return;
    setLoading(true);
    try {
      await claim(txHash);
      setTxHash('');
    } catch (manualClaimError) {
      logError({ manualClaimError });
      if (
        manualClaimError?.message === TOKENS_CLAIMED ||
        isRevertedError(manualClaimError)
      ) {
        setTxHash('');
        handleClaimError();
      } else {
        handleWalletError(manualClaimError, showError);
      }
    } finally {
      setLoading(false);
    }
  }, [claim, txHash, showError, handleClaimError]);

  if (!isConnected) return null;

  return (
    <Flex
      w="100%"
      justify="space-between"
      mb="4"
      align="center"
      bg={colorMode === 'dark' ? "#15141A" : "#ffffff"}
      p="1rem"
      borderRadius="15px"
      boxShadow="0px 4px 20px 0px #45566B14"
      direction={{ base: 'column', lg: 'row' }}
    >
      <Flex
        direction="column"
        fontSize="sm"
        w="100%"
        minW={{ base: 'auto', lg: '25rem' }}
        mb={{ base: '2', lg: '0' }}
      >
        <Text>
          Can&apos;t find your transfer to claim tokens?
        </Text>
        <Text color="greyText">
          Enter the transaction hash where the token transfer happened{' '}
        </Text>
      </Flex>
      <InputGroup>
        <Input
          // borderColor="#DAE3F0"
          // bg="white"
          // color="black"
          fontSize="sm"
          placeholder="Transaction Hash"
          _placeholder={{ color: '#686868' }}
          value={txHash}
          onChange={e => setTxHash(e.target.value)}
          pr="6rem"
        />
        <InputRightElement minW="5rem" pr={1}>
          <Button
            w="100%"
            size="sm"
            colorScheme="violet"
            onClick={claimTokens}
            isDisabled={!txHash}
            isLoading={loading || executing}
          >
            Claim
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};
