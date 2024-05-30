import { IconButton, Tooltip, useColorMode } from '@chakra-ui/react';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useSwitchChain } from 'hooks/useSwitchChain';
import { SwitchIcon } from 'icons/SwitchIcon';
import React, { useCallback, useState } from 'react';

export const SwitchButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isConnected, providerChainId, isMetamask } = useWeb3Context();

  const { switchTokens, toToken } = useBridgeContext();
  const switchChain = useSwitchChain();

  const isDefaultChain = [1, 6661].includes(toToken?.chainId);
  const isMobileBrowser = navigator?.userAgent?.includes('Mobile') ?? false;
  const canSwitchInWallet =
    isConnected && isMetamask && (isMobileBrowser ? !isDefaultChain : true);

  const [loading, setLoading] = useState(false);

  const switchOnClick = useCallback(
    () =>
      (async () => {
        setLoading(true);
        if (canSwitchInWallet && providerChainId !== toToken?.chainId) {
          await switchChain(toToken?.chainId);
        } else {
          switchTokens();
        }
        setLoading(false);
      })(),
    [switchChain, providerChainId, canSwitchInWallet, switchTokens, toToken],
  );

  return (
    <Tooltip label="Switch direction of bridge">
      <IconButton
        icon={<SwitchIcon boxSize="16px" />}
        p="7px"
        variant="ghost"
        borderRadius="8px"
        color="#ffffff"
        _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.300' : 'blackAlpha.300' }}
        onClick={switchOnClick}
        isLoading={loading}
        bg="#8F60FF"
        _loading={{
          bg: colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.3000',
        }}
      />
    </Tooltip>
  );
};
