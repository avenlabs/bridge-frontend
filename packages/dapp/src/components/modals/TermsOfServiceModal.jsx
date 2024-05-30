import {
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import InfoImage from 'assets/info.svg';
import React, { useState } from 'react';

const SHOW_TERMS = 'show-terms';

export const TermsOfServiceModal = () => {
  const fromStorage = window.localStorage.getItem(SHOW_TERMS);

  const [isOpen, setOpen] = useState(fromStorage !== 'false');
  const onClose = () => {
    window.localStorage.setItem(SHOW_TERMS, 'false');
    setOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay background="#000000e6">
        <ModalContent
          // boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          maxW="33.75rem"
          mx="4"
          bg="#191919"
        >
          <ModalHeader
            p={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={InfoImage} mb={4} w="4rem" />
            <Text color="white">Welcome to the CYBA Bridge</Text>
          </ModalHeader>
          <ModalBody px={8} py={0}>
            <Flex align="center" direction="column" fontSize="sm" color="#E1E1E1">
              <Text as="p" textAlign="center" mb="4">
                We're excited to launch our CYBA Bridge and UI App for beta testing. Despite our diligent efforts to perfect the software's core functionalities, there's a possibility that users might encounter bugs or other issues. If you do, please reach out to us at{' '}
                <Link
                  as="a"
                  href="mailto:info@cybria.io"
                  color="blue.500"
                  isExternal
                >
                  info@cybria.io
                </Link>
                .
              </Text>
              <Text as="p" textAlign="center" mb="4">
                Using this app and the CYBA Bridge comes with certain risks. Users might face unexpected delays, visual glitches, or even potential loss of tokens or funds due to incorrect app configuration, among other unforeseen issues.
              </Text>
              <Text as="p" textAlign="center" mb="4">
                {
                  'By clicking the "continue" button, you acknowledge that you have fully read our Terms of Service '
                }
                <Link
                  as="a"
                  href="https://www.cybria.io/legal.html"
                  color="blue.500"
                  isExternal
                >
                  (https://www.cybria.io/legal.html)
                </Link>
                {' and consent to be bound by them legally.'}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justify="center" align="center" w="100%">
              <Button onClick={onClose} colorScheme="blue" px="3rem">
                Continue
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
