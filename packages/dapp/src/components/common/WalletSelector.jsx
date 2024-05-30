import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Davatar from '@davatar/react';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useENS } from 'hooks/useENS';
import { WalletIcon } from 'icons/WalletIcon';
import { getAccountString, getNetworkLabel } from 'lib/helpers';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { WalletInfo } from './WalletInfo';

export const WalletSelector = ({ close }) => {
  const { account, loading, providerChainId, connectWeb3 } = useWeb3Context();
  const { ensName } = useENS(account);
  const { fromToken } = useBridgeContext();
  const { homeChainId, foreignChainId } = useBridgeDirection();
  const {
    location: { pathname },
  } = useHistory();

  let isInvalid = false;

  if (pathname === '/history') {
    isInvalid = loading
      ? false
      : ![homeChainId, foreignChainId].includes(providerChainId);
  } else {
    isInvalid =
      loading || !fromToken ? false : providerChainId !== fromToken?.chainId;
  }

  const placement = useBreakpointValue({ base: 'bottom', md: 'bottom-end' });
  if (!account || !providerChainId)
    return (
      <Button
        // colorScheme="black"
        onClick={() => {
          close();
          connectWeb3();
        }}
        // leftIcon={<WalletIcon />}
        color="#ffffff"
        background="#8F60FF"
        borderColor="#8F60FF"
        borderWidth="1px"
        borderRadius="34px"
        _hover={{ background: '#8F60FF' }}
        fontWeight={400}
        minH="40px"
        my={{ base: '20px', md: 0 }}
      >
        Connect Wallet
      </Button>
    );
  return (
    <Flex my={{ base: '20px', md: 0 }}>
      <Popover placement={placement}>
        <PopoverTrigger>
          <Button
            colorScheme={isInvalid ? 'red' : 'violet'}
            px={3}
            bg="#8F60FF"
            borderRadius="8px"
          >
            <Davatar
              address={account}
              size={20}
              generatedAvatarType="jazzicon"
            />
            <Text fontSize="sm" ml="2" color="white">
              {ensName || getAccountString(account)}
            </Text>
            <Flex
              justify="center"
              align="center"
              bg="white"
              borderRadius="6px"
              px={{ base: 3, md: 2, lg: 3 }}
              height="2rem"
              fontSize="sm"
              color="purple"
              fontWeight="600"
              ml={3}
            >
              {getNetworkLabel(providerChainId)}
            </Flex>
          </Button>
        </PopoverTrigger>
        <PopoverContent border="none" right={0} p="0">
          <PopoverBody
            width="100%"
            align="center"
            boxShadow="0px 4px 20px 0px rgba(69, 86, 107, 0.08)"
            p={4}
          >
            <WalletInfo {...{ close }} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
