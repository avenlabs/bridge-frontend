import { Flex, Image } from '@chakra-ui/react';
import DownTriangle from 'assets/down-triangle.svg';
import UpTriangle from 'assets/up-triangle.svg';
import ImageBackground from 'assets/image_background.png';
import { Footer } from 'components/common/Footer';
import { TermsOfServiceModal } from 'components/modals/TermsOfServiceModal';
import React from 'react';

export const Layout = ({ children }) => (
  <Flex direction="column" minH="100vh">
    <Flex
      p={0}
      m={0}
      overflowX="hidden"
      fontFamily="body"
      w="100%"
      // minH="100vh"
      align="center"
      direction="column"
      // background="#ffffff"
      position="relative"
    >
      {/* <Image
        src={DownTriangle}
        position="absolute"
        right="min(-15rem, -20%)"
        w="60rem"
        minWidth="30rem"
        opacity={0.99}
      />
      <Image
        src={UpTriangle}
        position="absolute"
        left="min(-27rem, -20%)"
        w="81rem"
        minWidth="60rem"
        opacity={0.99}
      /> */}
      {/* <Image src={ImageBackground} position="absolute" top={{ base: "auto", md: 0}} bottom={{base: 0, md: "auto"}} maxH="100%" /> */}
      <Flex
        flex={1}
        align="center"
        justify="flex-start"
        direction="column"
        w="100%"
        h="100%"
        position="relative"
      >
        {children}
      </Flex>
      <TermsOfServiceModal />
    </Flex>
    <Footer />
  </Flex>
);
