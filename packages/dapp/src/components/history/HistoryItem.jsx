import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Grid,
  Image,
  Link,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import RightArrowImage from 'assets/right-arrow.svg';
import { AddToMetamask } from 'components/common/AddToMetamask';
import { BigNumber } from 'ethers';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useClaim } from 'hooks/useClaim';
import { isRevertedError, TOKENS_CLAIMED } from 'lib/amb';
import {
  formatValue,
  getExplorerUrl,
  getHelperContract,
  getNativeCurrency,
  handleWalletError,
  logError,
} from 'lib/helpers';
import React, { useCallback, useState } from 'react';

const shortenHash = hash =>
  `${hash.slice(0, 6)}...${hash.slice(hash.length - 4, hash.length)}`;

const Tag = ({ bg, txt }) => (
  <Flex
    justify="center"
    align="center"
    bg={bg}
    borderRadius="6px"
    px="0.75rem"
    height="1.5rem"
    fontSize="xs"
    color="white"
    fontWeight="600"
    w="auto"
  >
    <Text>{txt}</Text>
  </Flex>
);

const networkTags = {
  100: <Tag bg="#8F60FF" txt="Gnosis Chain" />,
  99: <Tag bg="#8F60FF" txt="POA" />,
  1: <Tag bg="#8F60FF" txt="Ethereum" />,
  11155111: <Tag bg="#8F60FF" txt="Ethereum" />,
  42: <Tag bg="#8F60FF" txt="Kovan" />,
  77: <Tag bg="#8F60FF" txt="POA Sokol" />,
  56: <Tag bg="#8F60FF" txt="BSC" />,
  6661: <Tag bg="#8F60FF" txt="CYBA" />,
};

const getNetworkTag = chainId => networkTags[chainId];

export const HistoryItem = ({
  data: {
    user,
    chainId,
    timestamp,
    sendingTx,
    receivingTx: inputReceivingTx,
    amount,
    toToken,
    message,
    status,
  },
  handleClaimError,
}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const {
    homeChainId,
    foreignChainId,
    getBridgeChainId,
    getMonitorUrl,
    enableForeignCurrencyBridge,
  } = useBridgeDirection();
  const bridgeChainId = getBridgeChainId(chainId);

  const timestampString = new Date(
    parseInt(timestamp, 10) * 1000,
  ).toLocaleTimeString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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

  const { claim, executing, executionTx } = useClaim();
  const [claiming, setClaiming] = useState(false);
  const receivingTx = executionTx || inputReceivingTx;
  const claimed = !!receivingTx;
  const failed = !!inputReceivingTx && status === false;

  const showAlreadyClaimedModal = useCallback(() => {
    handleClaimError(toToken);
  }, [toToken, handleClaimError]);

  const claimTokens = useCallback(async () => {
    try {
      setClaiming(true);
      await claim(sendingTx, message);
    } catch (claimError) {
      logError({ claimError });
      if (
        claimError.message === TOKENS_CLAIMED ||
        isRevertedError(claimError)
      ) {
        showAlreadyClaimedModal();
      } else {
        handleWalletError(claimError, showError);
      }
    } finally {
      setClaiming(false);
    }
  }, [claim, sendingTx, message, showError, showAlreadyClaimedModal]);
  const homeCurrencyHelperContract = getHelperContract(foreignChainId, homeChainId);
  const { symbol: tokenSymbol } =
    enableForeignCurrencyBridge && user === homeCurrencyHelperContract
      ? getNativeCurrency(foreignChainId)
      : toToken;

  return (
    <Flex
      w="100%"
      // background="white"
      // color="black"
      // boxShadow="0px 4px 20px 0px rgba(69, 86, 107, 0.08)"
      // borderRadius="1rem"
      fontSize="sm"
      p={4}
      // mb={4}
      borderBottom={colorMode === 'dark' ? "1px solid #464a50" : "1px solid #E2E8F0"}
      _last={{borderBottom: 'none'}}
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: '1.75fr 1.8fr 1fr 0.5fr',
          lg: '1.25fr 1.8fr 1fr 0.5fr',
        }}
        w="100%"
      >
        {/* <Flex align="center" justify="space-between" mb={{ base: 1, md: 0 }}>
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Date
          </Text>
          <Text my="auto">{timestampString}</Text>
        </Flex> */}
        <Flex align="center" justify="space-between" mb={{ base: 1, md: 0 }}>
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Direction
          </Text>
          <Flex align="center">
            {getNetworkTag(chainId)}
            <Image src={RightArrowImage} mx="0.5rem" />
            {getNetworkTag(bridgeChainId)}
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'start' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            {'From -> To'}
          </Text>
          <Flex gap="5px">
            <Link
              color="violet.400"
              href={getMonitorUrl(chainId, sendingTx)}
              rel="noreferrer noopener"
              target="_blank"
              my="auto"
              textAlign="left"
            >
              {shortenHash(sendingTx)}
            </Link>
            <Text as="span">{'->'}</Text>
            {receivingTx ? (
              <Link
                color="violet.400"
                href={`${getExplorerUrl(bridgeChainId)}/tx/${receivingTx}`}
                rel="noreferrer noopener"
                target="_blank"
                my="auto"
                textAlign="left"
              >
                {shortenHash(receivingTx)}
              </Link>
            ) : (
              <Text />
            )}
          </Flex>
        </Flex>
        {/* <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Receiving Tx
          </Text>
          {receivingTx ? (
            <Link
              color="violet.400"
              href={`${getExplorerUrl(bridgeChainId)}/tx/${receivingTx}`}
              rel="noreferrer noopener"
              target="_blank"
              my="auto"
              textAlign="center"
            >
              {shortenHash(receivingTx)}
            </Link>
          ) : (
            <Text />
          )}
        </Flex> */}
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'flex-end' }}
          mb={{ base: 1, md: 0 }}
          pr={{ base: 0, md: 2 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            Amount
          </Text>
          <Flex>
            <Text my="auto" textAlign="right">
              {`${formatValue(
                BigNumber.from(amount),
                toToken.decimals,
              )} ${tokenSymbol}`}
            </Text>
            <AddToMetamask token={toToken} ml="0.25rem" />
          </Flex>
        </Flex>
        {claimed ? (
          <Flex align="center" justify={{ base: 'center', md: 'flex-end' }}>
            {failed ? (
              <CloseIcon color="red.500" boxSize="0.75rem" pb="0.1rem" />
            ) : (
              <CheckIcon color="violet.400" boxSize="0.75rem" />
            )}
            <Text ml="0.25rem" color={failed ? 'red.500' : 'violet.400'}>
              {failed ? 'Failed' : 'Claimed'}
            </Text>
          </Flex>
        ) : (
          <Flex align="center" justify={{ base: 'center', md: 'flex-end' }}>
            <Button
              size="sm"
              minW="5rem"
              colorScheme="violet"
              onClick={claimTokens}
              isLoading={claiming || executing}
            >
              Claim
            </Button>
          </Flex>
        )}
      </Grid>
    </Flex>
  );
};
