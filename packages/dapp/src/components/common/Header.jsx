import {
  Button,
  Flex,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Link as LinkChakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import Logo from 'assets/logo.png';
import LogoDark from 'assets/logo_dark.png';
import { BridgeDropdown } from 'components/common/BridgeDropdown';
import { UpdateSettings } from 'components/common/UpdateSettings';
import { WalletSelector } from 'components/common/WalletSelector';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { DownArrowIcon } from 'icons/DownArrowIcon';
import { HistoryIcon } from 'icons/HistoryIcon';
import { TwitterIcon } from 'icons/TwitterIcon';
import { TelegramIcon } from 'icons/TelegramIcon';
import { GithubIcon } from 'icons/GithubIcon';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SwitchDarkModeIcon } from 'icons/SwitchDarkModeIcon';

const HistoryLink = ({ close }) => {
  const { push } = useHistory();

  return (
    <Button
      variant="ghost"
      // color="#ffffff"
      // _hover={{ color: '#ffffff', bgColor: 'blackAlpha.100' }}
      onClick={() => {
        push('/transaction');
        close();
      }}
      leftIcon={<HistoryIcon color="#8F60FF" />}
      fontSize="16px"
      px={{ base: 0, md: '8px' }}
      py={{ base: '16px', md: '10px' }}
      borderBottom={{ base: '1px solid #222222', md: 'none' }}
      borderRadius={{ base: 0, md: '8px' }}
      w={{ base: '100%', md: 'auto' }}
      h={{ base: '56px', md: 'auto' }}
      justifyContent={{ base: 'start', md: 'center' }}
    >
      <Text fontWeight={400} fontSize="16px">
        {' '}
        Transaction
      </Text>
    </Button>
  );
};

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isConnected } = useWeb3Context();
  const { loading } = useBridgeContext();
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(open => !open);
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isOpenTestnet,
    onOpen: onOpenTestnet,
    onClose: onCloseTestnet,
  } = useDisclosure();
  const {
    isOpen: isOpenMainnet,
    onOpen: onOpenMainnet,
    onClose: onCloseMainnet,
  } = useDisclosure();
  const {
    isOpen: isOpenCommunity,
    onOpen: onOpenCommunity,
    onClose: onCloseCommunity,
  } = useDisclosure();

  return (
    <Flex
      flex="0 0 auto"
      justify="space-between"
      position={{ base: isOpen ? 'fixed' : 'relative', md: 'relative' }}
      top={isOpen ? 0 : undefined}
      left={isOpen ? 0 : undefined}
      align={{ base: 'stretch', md: 'center' }}
      maxW="75rem"
      minH={20}
      px={{ base: 4, md: 0 }}
      mx={{ base: 0, md: 4 }}
      w={{ base: '100%', md: 'calc(100% - 4rem)' }}
      background={
        isOpen ? { base: colorMode === 'dark' ? '#23232C' : '#ffffff', md: 'transparent' } : 'transparent'
      }
      direction={{ base: 'column', md: 'row' }}
      mb={isOpen ? { base: 4, md: 0 } : 0}
      // boxShadow={
      //   isOpen ? { base: '0 0.5rem 1rem #CADAEF', md: 'none' } : 'none'
      // }
      h={isOpen && isSmallScreen ? '100%' : undefined}
      zIndex={isOpen ? 5 : undefined}
    >
      <Flex justify="space-between" height={20} minHeight={20} align="center">
        <Link to="/">
          <Flex justify="space-around" align="center">
            <Image src={colorMode === 'dark' ? Logo : LogoDark} mr={4} w="189px" />
            {/* <Text fontWeight="bold">CYBA Bridge</Text> */}
          </Flex>
        </Link>
        <Button
          variant="link"
          display={loading ? 'none' : { base: 'block', md: 'none' }}
          // color="#000000"
          // _hover={{ color: '#000000' }}
          onClick={toggleOpen}
          minW="auto"
          p="2"
        >
          {!isOpen && (
            <svg fill="currentColor" width="1.5rem" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          )}
          {isOpen && (
            <svg width="1.25rem" viewBox="0 0 18 18" fill="none">
              <title>Close</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.2923 17.2923C16.9011 17.6835 16.2669 17.6835 15.8757 17.2923L8.79285 10.2094L1.70996 17.2923C1.31878 17.6835 0.684559 17.6835 0.293382 17.2923C-0.0977942 16.9011 -0.0977941 16.2669 0.293383 15.8757L7.37627 8.79285L0.293383 1.70996C-0.0977941 1.31878 -0.0977942 0.684559 0.293382 0.293382C0.684559 -0.0977943 1.31878 -0.097794 1.70996 0.293383L8.79285 7.37627L15.8757 0.293407C16.2669 -0.09777 16.9011 -0.0977703 17.2923 0.293406C17.6835 0.684583 17.6835 1.31881 17.2923 1.70998L10.2094 8.79285L17.2923 15.8757C17.6835 16.2669 17.6835 16.9011 17.2923 17.2923Z"
                fill="currentColor"
              />
            </svg>
          )}
        </Button>
      </Flex>
      <Flex
        position={{ base: 'relative', md: 'static' }}
        direction={{ base: 'column', md: 'row' }}
        display={
          loading ? 'none' : { base: isOpen ? 'flex' : 'none', md: 'flex' }
        }
        w={{ base: '100%', md: 'auto' }}
        h={{ base: '100%', md: 'auto' }}
        align="start"
        justify="start"
        // spacing={{ base: 0, md: 0, lg: 2 }}
        gap={{ base: 0, md: '22px' }}
        overflowY="auto"
      >
        {isConnected && (
          <>
            <HistoryLink close={() => setOpen(false)} />
            <UpdateSettings close={() => setOpen(false)} />
          </>
        )}
        <WalletSelector close={() => setOpen(false)} />
        <BridgeDropdown close={() => setOpen(false)} />
        <Button p={{base: "8px 0", md: "8px 10px"}} w={{base: "100%", md: "auto"}} justifyContent="start" bg="transparent" onClick={toggleColorMode} color={colorMode === 'light' ? "#8F60FF" : "#ffffff"}>
          <SwitchDarkModeIcon w="26px" height="26px" />
        </Button>
      </Flex>
    </Flex>
  );
};
