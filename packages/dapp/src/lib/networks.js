import {
  // BSC_CYBA_BRIDGE,
  // BSC_XDAI_BRIDGE,
  ETH_CYBA_BRIDGE,
  // ETH_BSC_BRIDGE,
  // ETH_XDAI_BRIDGE,
  // KOVAN_SOKOL_BRIDGE,
  // nativeCurrencies,
  // POA_XDAI_BRIDGE,
} from 'lib/constants';

export {
  // BSC_CYBA_BRIDGE,
  // BSC_XDAI_BRIDGE,
  ETH_CYBA_BRIDGE,
  // ETH_BSC_BRIDGE,
  // ETH_XDAI_BRIDGE,
  // KOVAN_SOKOL_BRIDGE,
  // POA_XDAI_BRIDGE,
};

// const BSC_CYBA_BRIDGE_CONFIG = {
//   label: 'cyba⥊bsc',
//   homeChainId: 56,
//   foreignChainId: 6661,
//   enableForeignCurrencyBridge: true,
//   homeWrappedForeignCurrencyAddress:
//     '0x567556A7493FB7a22d2fd158Dd4C766a98705f96'.toLowerCase(),
//   wrappedForeignCurrencyAddress:
//     '0x95622Fce49d65D1101f6FDa8b6325459A6188E52'.toLowerCase(),
//   foreignMediatorAddress:
//     '0xa3F37D00C47F4B0FDd5acE310632489A21779a6b'.toLowerCase(),
//   homeMediatorAddress:
//     '0xa3F37D00C47F4B0FDd5acE310632489A21779a6b'.toLowerCase(),
//   foreignAmbAddress: '0x833EC014846A7498a10dBa7A8510Bbfa3DF0079f'.toLowerCase(),
//   homeAmbAddress: '0x833EC014846A7498a10dBa7A8510Bbfa3DF0079f'.toLowerCase(),
//   foreignGraphName: 'cyba/cyba-to-bsc-omnibridge',
//   homeGraphName: 'bsc/bsc-to-cyba-omnibridge',
//   ambLiveMonitorPrefix: 'https://alm-bsc.cybria.io',
//   claimDisabled: false,
//   tokensClaimDisabled: [
//     '0x567556A7493FB7a22d2fd158Dd4C766a98705f96'.toLowerCase(), // Wrapped CYBA from CYBA
//   ],
// };
const ETH_CYBA_BRIDGE_CONFIG = {
  label: 'cyba⥊eth',
  homeChainId: 1,
  foreignChainId: 6661,
  enableForeignCurrencyBridge: true,
  homeWrappedForeignCurrencyAddress:
    '0x454112b972176Caa0be90BC9C5e842B4cA6E7457'.toLowerCase(),
  wrappedForeignCurrencyAddress:
    '0x95622Fce49d65D1101f6FDa8b6325459A6188E52'.toLowerCase(),
  foreignMediatorAddress:
    '0x21085558e5B8F613578AadeA19ACc8095C27b73c'.toLowerCase(),
  homeMediatorAddress:
    '0xB093D66c7494534b42D7c58d4Cda229E7f08b361'.toLowerCase(),
  foreignAmbAddress: '0x2685cAbaEb925Dca0C709c1842C661927f89249B'.toLowerCase(),
  homeAmbAddress: '0xfF1536c769FA7924BfE361FAFfeC15F1BA303492'.toLowerCase(),
  foreignGraphName: 'cyba/cyba-to-eth-omnibridge',
  homeGraphName: 'eth/eth-to-cyba-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-eth.cybria.io',
  claimDisabled: false,
  tokensClaimDisabled: [
    '0x454112b972176Caa0be90BC9C5e842B4cA6E7457'.toLowerCase(), // Wrapped BNB from BSC
  ],
};

const ENABLED_BRIDGES = process.env.REACT_APP_ENABLED_BRIDGES.split(' ').map(
  b => b.toLowerCase(),
);
// console.debug('ENABLED_BRIDGES', ENABLED_BRIDGES, process.env.REACT_APP_ENABLED_BRIDGES)
const bridgeInfo = {
  // [BSC_CYBA_BRIDGE]: BSC_CYBA_BRIDGE_CONFIG,
  [ETH_CYBA_BRIDGE]: ETH_CYBA_BRIDGE_CONFIG
};

const getNetworkConfig = bridges => {
  if (bridges && bridges.length > 0 && bridgeInfo) {
    return bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {});
  }
  return bridgeInfo;
};

export const networks = getNetworkConfig(ENABLED_BRIDGES);

export const defaultTokens = {
  [ETH_CYBA_BRIDGE]: {
    1: {
      address: '0x454112b972176Caa0be90BC9C5e842B4cA6E7457',
      chainId: 1,
      symbol: 'WETH',
      name: 'Wrapped Ether',
    },
    6661: {
      address: '0x95622Fce49d65D1101f6FDa8b6325459A6188E52',
      chainId: 6661,
      symbol: 'WCYBA',
      name: 'Wrapped Cybria',
    },
  },
  // [BSC_CYBA_BRIDGE]: {
  //   6661: {
  //     address: '0x95622Fce49d65D1101f6FDa8b6325459A6188E52',
  //     chainId: 6661,
  //     symbol: 'WCYBA',
  //     name: 'Wrapped CYBAION',
  //   },
  //   56: {
  //     address: '0x567556A7493FB7a22d2fd158Dd4C766a98705f96',
  //     chainId: 56,
  //     symbol: 'WCYBA',
  //     name: 'Wrapped CYBA from CYBA',
  //   },
  // },
};
