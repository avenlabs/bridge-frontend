import { Box, Flex, Grid, Image, Text, useBreakpointValue, useColorMode, VStack } from '@chakra-ui/react';
import { ActionButtons } from 'components/bridge/ActionButtons';
import { AdvancedMenu } from 'components/bridge/AdvancedMenu';
import { FromToken } from 'components/bridge/FromToken';
import { SwitchButton } from 'components/bridge/SwitchButton';
import { SystemFeedback } from 'components/bridge/SystemFeedback';
import { ToToken } from 'components/bridge/ToToken';
// import { CoinzillaBannerAd } from 'components/common/CoinzillaBannerAd';
// import { CoinzillaTextAd } from 'components/common/CoinzillaTextAd';
import { BridgeLoadingModal } from 'components/modals/BridgeLoadingModal';
import { GnosisSafeWarning } from 'components/warnings/GnosisSafeWarning';
import {
  InflationaryTokenWarning,
  isInflationaryToken,
} from 'components/warnings/InflationaryTokenWarning';
import { RPCHealthWarning } from 'components/warnings/RPCHealthWarning';
import { TokenWarnings } from 'components/warnings/TokenWarnings';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useTokenLimits } from 'hooks/useTokenLimits';
import { getNetworkName } from 'lib/helpers';
import React from 'react';
import bgBridge from 'assets/bg_bridge.png'

export const BridgeTokens = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { getBridgeChainId } = useBridgeDirection();
  const { fromToken } = useBridgeContext();
  const isInflationToken = isInflationaryToken(fromToken);
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  const { tokenLimits, fetching, refresh } = useTokenLimits();

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      w={{ base: undefined, lg: 'calc(100% - 4rem)' }}
      maxW="75rem"
      // my="auto"
      mx={{ base: 4, sm: 8 }}
      py="60px"
    >
      <style>
          {`body {background-image: url(/images/bg_bridge.png);}`}
      </style>
      {/* <CoinzillaTextAd /> */}
      <GnosisSafeWarning noCheckbox />
      <RPCHealthWarning />
      {isInflationToken && (
        <InflationaryTokenWarning token={fromToken} noCheckbox />
      )}
      <TokenWarnings token={fromToken} />
      <BridgeLoadingModal />
      {fromToken && (
        <Flex
          w="100%"
          maxW="480px"
          bg={colorMode === 'dark' ? "#15141A" : "#ffffff"}
          boxShadow="0px 4px 20px 0px #45566B14"
          borderRadius="15px"
          direction="column"
          align="center"
          p="30px"
          position="relative"
        >
          <Flex
            width="100%"
            position="relative"
            direction="column"
          >
            <Flex align="flex-start" direction="column" m={2} minH="3rem">
              <Text color="#878D99" fontSize="sm">
                From
              </Text>
              <Text fontSize="lg" fontWeight={600}>
                {fromToken ? getNetworkName(fromToken.chainId) : ''}
              </Text>
            </Flex>
            <FromToken />
            <ActionButtons tokenLimits={tokenLimits} />
            <Flex align="flex-start" direction="column" m={2} minH="3rem">
              <Text color="#878D99" fontSize="sm">
                To
              </Text>
              <Text fontSize="lg" fontWeight={600}>
                {fromToken
                  ? getNetworkName(getBridgeChainId(fromToken.chainId))
                  : ''}
              </Text>
            </Flex>
            <ToToken />
          </Flex>
          <Flex mt="20px" gap="10px" flexWrap="wrap" w="100%">
            <AdvancedMenu />
            <SystemFeedback {...{ tokenLimits, fetching, refresh }} />
          </Flex>
        </Flex>
      )}
      {/* <CoinzillaBannerAd /> */}
    </Flex>
  );
};
