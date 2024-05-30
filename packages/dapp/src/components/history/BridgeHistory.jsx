import {
  Box,
  Checkbox,
  Flex,
  Grid,
  Text,
  useColorMode,
} from '@chakra-ui/react';
// import { CoinzillaBannerAd } from 'components/common/CoinzillaBannerAd';
// import { CoinzillaTextAd } from 'components/common/CoinzillaTextAd';
import { HistoryItem } from 'components/history/HistoryItem';
import { HistoryPagination } from 'components/history/HistoryPagination';
import { ManualClaim } from 'components/history/ManualClaim';
import { NoHistory } from 'components/history/NoHistory';
import { ClaimErrorModal } from 'components/modals/ClaimErrorModal';
import { LoadingModal } from 'components/modals/LoadingModal';
import { AuspiciousGasWarning } from 'components/warnings/AuspiciousGasWarning';
import { GraphHealthWarning } from 'components/warnings/GraphHealthWarning';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useUserHistory } from 'hooks/useUserHistory';
import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';

const TOTAL_PER_PAGE = 20;

export const BridgeHistory = ({ page }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isConnected } = useWeb3Context();
  const { loading: loadingBridge } = useBridgeContext();
  const { transfers, loading: loadingHistory } = useUserHistory();

  const loading = loadingBridge || loadingHistory;

  const [onlyUnReceived, setOnlyUnReceived] = useState(false);
  const [claimErrorShow, setClaimErrorShow] = useState(false);
  const [claimErrorToken, setClaimErrorToken] = useState(null);

  const handleClaimError = useCallback(toToken => {
    toToken && setClaimErrorToken(toToken);
    setClaimErrorShow(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setClaimErrorShow(false);
    claimErrorToken && setClaimErrorToken(null);
  }, [claimErrorToken]);

  if (loading) {
    return <LoadingModal />;
  }

  const filteredTransfers = onlyUnReceived
    ? transfers.filter(i => i.receivingTx === null)
    : transfers;

  const numPages = Math.ceil(filteredTransfers.length / TOTAL_PER_PAGE);
  const displayHistory = filteredTransfers.slice(
    (page - 1) * TOTAL_PER_PAGE,
    Math.min(page * TOTAL_PER_PAGE, filteredTransfers.length),
  );

  if (numPages > 1 && page > numPages) {
    return <Redirect to="/history" />;
  }

  return (
    <Flex
      maxW="75rem"
      direction="column"
      mt={8}
      mx={{ base: 4, sm: 8 }}
      w={{ base: 'calc(100% - 2rem)', lg: 'calc(100% - 4rem)' }}
      mb="20px"
      minH="calc(100vh - 242px)"
    >
      <style>{`body {background-image: url(/images/bg_history.png);}`}</style>
      {/* <CoinzillaTextAd /> */}
      <ClaimErrorModal
        claimErrorShow={claimErrorShow}
        claimErrorToken={claimErrorToken}
        onClose={handleModalClose}
      />
      <AuspiciousGasWarning />
      {/* <GraphHealthWarning /> */}
      {/* <ManualClaim handleClaimError={handleClaimError} /> */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          Transaction
        </Text>
        {/* {isConnected && (
          <Checkbox
            isChecked={onlyUnReceived}
            onChange={e => setOnlyUnReceived(e.target.checked)}
            borderColor="grey"
            borderRadius="4px"
            size="lg"
            variant="solid"
          >
            <Text fontSize="sm">Show only unreceived</Text>
          </Checkbox>
        )} */}
      </Flex>

      {displayHistory.length > 0 ? (
        <Box
          bg={colorMode === 'dark' ? '#23232C' : '#FFFFFF'}
          borderRadius="15px"
          boxShadow="0px 4px 20px 0px #45566B14"
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
            {/* <Text>Date</Text> */}
            <Text>Direction</Text>
            <Text textAlign="left">{'From -> To'}</Text>
            {/* <Text textAlign="center">Receiving Tx</Text> */}
            <Text textAlign="right" pr={{ base: 0, md: 2 }}>
              Amount
            </Text>
            <Text textAlign="right">Status</Text>
          </Grid>
          {displayHistory.slice(0, 3).map(item => (
            <HistoryItem
              key={item.sendingTx}
              data={item}
              handleClaimError={handleClaimError}
            />
          ))}
          {/* <CoinzillaBannerAd my="20px" mt="4px" /> */}
          {displayHistory.slice(3).map(item => (
            <HistoryItem
              key={item.sendingTx}
              data={item}
              handleClaimError={handleClaimError}
            />
          ))}
          {numPages > 1 && (
            <HistoryPagination numPages={numPages} currentPage={page} />
          )}
        </Box>
      ) : (
        <NoHistory />
      )}
    </Flex>
  );
};
