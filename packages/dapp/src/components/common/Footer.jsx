import {Box, Flex, HStack, Image, Text, useBreakpointValue, useColorMode} from '@chakra-ui/react';
// import { GithubIcon } from 'icons/GithubIcon';
// import { GnosisChainIcon } from 'icons/GnosisChainIcon';
// import { RaidGuildIcon } from 'icons/RaidGuildIcon';
import { TelegramIcon } from 'icons/TelegramIcon';
import { TwitterIcon } from 'icons/TwitterIcon';
import { FacebookIcon } from 'icons/FacebookIcon';
import { InstagramIcon } from 'icons/InstagramIcon';
import LogoFooter from 'assets/logo_footer.png'
import LogoFooterDark from 'assets/logo_footer_dark.png'

import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon } from 'icons/GithubIcon';
import { YoutubeIcon } from 'icons/YoutubeIcon';
import { RedditIcon } from 'icons/RedditIcon';
import { MediumIcon } from 'icons/MediumIcon';
import { CybaBridgeIcon } from 'icons/CybaBridgeIcon';

export const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      p={0}
      m={0}
      mt="auto"
      fontFamily="body"
      w="100%"
      align="center"
      direction="column"
      // background="#ffffff"
      position="relative"
      color="#313743"
    >
      <Flex
        gap="30px"
        flexWrap="wrap"
        mt="50px"
        mb="30px"
        w="100%"
        maxW="75rem"
        px="15px"
        justify="space-between"
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex>
          <Image src={colorMode === 'dark' ? LogoFooter : LogoFooterDark} height={26} />
        </Flex>
        <Flex gap="25px" color="#8F60FF" alignItems="center">
          <CybaBridgeIcon color={colorMode === 'dark' ? 'white' : 'black'} w={30} h={30} />
          <a href="https://telegram.me/cybriacoin" target='_blank'><TelegramIcon width="20px" height="20px" /></a>
          <a href="https://twitter.com/cybriacoin" target='_blank'><TwitterIcon width="20px" height="20px" /></a>
          <a href="https://github.com/cybriacoin" target='_blank'><GithubIcon width="20px" height="20px" /></a>
        </Flex>
      </Flex>
    </Flex>
  );
};
