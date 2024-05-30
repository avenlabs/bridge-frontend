import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSettings } from 'contexts/SettingsContext';
import { DownArrowIcon } from 'icons/DownArrowIcon';
import { NetworkIcon } from 'icons/NetworkIcon';
import { networks } from 'lib/networks';
import React, { useCallback, useEffect } from 'react';

export const BridgeDropdown = ({ close }) => {
  const { bridgeDirection, setBridgeDirection } = useSettings();
  const placement = useBreakpointValue({ base: 'bottom', md: 'bottom-end' });

  const setItem = useCallback(
    e => {
      setBridgeDirection(e.target.value, true);
      close();
    },
    [close, setBridgeDirection],
  );

  const networkOptions = Object.keys(networks);
  const isValidNetwork = Object.keys(networks).indexOf(bridgeDirection) >= 0;
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~', networkOptions)
  const currentBridgeDirection = isValidNetwork
    ? bridgeDirection
    : networkOptions[0];

  useEffect(() => {
    if (!isValidNetwork) {
      setBridgeDirection(networkOptions[0], true);
    }
  }, [isValidNetwork, networkOptions, setBridgeDirection]);

  return (
    <Menu placement={placement}>
      <MenuButton
        as={Button}
        leftIcon={<NetworkIcon color="#8F60FF" />}
        rightIcon={<DownArrowIcon boxSize="0.5rem" />}
        bg="none"
        px={{ base: 0, md: '8px' }}
        py={{ base: '16px', md: '10px' }}
        borderBottom={{ base: '1px solid #222222', md: 'none' }}
        borderRadius={{ base: 0, md: '8px' }}
        w={{ base: '100%', md: 'auto' }}
        h={{ base: '56px', md: 'auto' }}
        // _hover={{ color: '#000000', bgColor: 'blackAlpha.100' }}
        _active={{ bgColor: 'blackAlpha.100' }}
      >
        <Text
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="400"
          textAlign={{ base: 'left', md: 'center' }}
        >
          {networks[currentBridgeDirection].label}
        </Text>
      </MenuButton>
      <MenuList
        border="none"
        // boxShadow="0 0.5rem 1rem #CADAEF"
        zIndex="3"
        // background="#121212"
      >
        {Object.entries(networks).map(([key, { label }]) => (
          <MenuItem
            value={key}
            onClick={setItem}
            key={key}
            textTransform="uppercase"
            fontWeight="400"
            fontSize="sm"
            justifyContent="center"
            // color="#000000"
            // _hover={{background: '#626262'}}
            // _focus={{background: '#626262'}}
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
