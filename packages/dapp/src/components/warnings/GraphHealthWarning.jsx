import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { useGraphHealth } from 'hooks/useGraphHealth';
import React from 'react';

export const GraphHealthWarning = () => {
  const { foreignHealthy, homeHealthy } = useGraphHealth();
  if (foreignHealthy && homeHealthy) return null;

  return (
    <Flex align="center" direction="column" w="100%" mb="4">
      <Alert
        status="warning"
        borderRadius={5}
        boxShadow="0px 4px 20px 0px rgba(69, 86, 107, 0.08)"
      >
        <AlertIcon minWidth="20px" />
        <Text fontSize="small">
          The Graph service may not work properly and some transfers may not
          display. You can use the form below to claim your tokens. If your
          transfer is still displayed as unclaimed double check its status in
          AMB Live Monitoring app by clicking the link in the Sending Tx column.
        </Text>
      </Alert>
    </Flex>
  );
};
