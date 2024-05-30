import { Box, Button, Flex, Grid, Image, Text, useColorMode } from '@chakra-ui/react';
import NoHistoryImage from 'assets/no-history.svg';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoHistory = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      bg={colorMode === 'dark' ? '#23232C' : '#FFFFFF'}
      borderRadius="15px"
      boxShadow="0px 4px 20px 0px #45566B14"
      flexDirection="column"
      flex={1}
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: '1.75fr 1.8fr 1fr 0.5fr',
          lg: '1.25fr 1.8fr 1fr 0.5fr',
        }}
        color="white"
        px='30px'
        py="15px"
        display={{ base: 'none', md: 'grid' }}
        bg="#15141A"
        borderTopRightRadius="15px"
        borderTopLeftRadius="15px"
      >
        <Text>Direction</Text>
        <Text textAlign="left">{'From -> To'}</Text>
        <Text textAlign="right" pr={{ base: 0, md: 2 }}>
          Amount
        </Text>
        <Text textAlign="right">Status</Text>
      </Grid>
      <Flex
        w="100%"
        flex={1}
        fontSize="sm"
        p={4}
        justifyContent="center"
        alignItems="center"
      >
        <Text>No transactions found</Text>
      </Flex>
    </Flex>
  );
};
