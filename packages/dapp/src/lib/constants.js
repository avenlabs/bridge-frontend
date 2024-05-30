import { BigNumber } from 'ethers';

export const ETH_XDAI_BRIDGE = 'eth-xdai';
export const BSC_XDAI_BRIDGE = 'bsc-xdai';
export const POA_XDAI_BRIDGE = 'poa-xdai';
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol';
export const ETH_BSC_BRIDGE = 'eth-bsc';

export const BSC_CYBA_BRIDGE = 'cyba-bsc';
export const ETH_CYBA_BRIDGE = 'cyba-eth';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO = `${process.env.REACT_APP_URL}/tokenlist/eth.png`;
export const BNB_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
// export const POA_CURRENCY_LOGO =
// 'https://s2.coinmarketcap.com/static/img/coins/64x64/2548.png';
export const POA_CURRENCY_LOGO = `${process.env.REACT_APP_URL}/tokenlist/cyba_logo.png`;

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const OWLRACLE_API_KEY = process.env.REACT_APP_OWLRACLE_API_KEY;

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const DEFAULT_BRIDGE_DIRECTION =
  process.env.REACT_APP_DEFAULT_BRIDGE_DIRECTION;

export const COINZILLA_API_KEY =
  process.env.REACT_APP_COINZILLA_API_KEY || null;

export const NON_ETH_CHAIN_IDS = [1, 6661];

export const XDAI_CHAIN_IDS = [];

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  // 11155111: {
  //   chainId: 11155111,
  //   decimals: 18,
  //   logoURI: ETHER_CURRENCY_LOGO,
  //   address: ADDRESS_ZERO,
  //   name: 'Ether',
  //   symbol: 'ETH',
  //   mode: 'NATIVE',
  // },
  // 56: {
  //   chainId: 56,
  //   decimals: 18,
  //   logoURI: BNB_CURRENCY_LOGO,
  //   name: 'Binance Coin',
  //   address: ADDRESS_ZERO,
  //   symbol: 'BNB',
  //   mode: 'NATIVE',
  // },
  6661: {
    chainId: 6661,
    decimals: 18,
    logoURI: POA_CURRENCY_LOGO,
    name: 'CYBA',
    address: ADDRESS_ZERO,
    symbol: 'CYBA',
    mode: 'NATIVE',
  }

};

export const nativeCurrencyMediators = {
  // 1: '0xd20a0e1e4de8931C4c7d9B99E0BEf51fd2deb588'.toLowerCase(),
  // 56: '0xDdeA53724Bed898056b450b106009551233c0253'.toLowerCase(),
  6661: {
    1: '0x38a9fa193397aB1B6ae701D65E56970c1a879608'.toLowerCase(),
    // 56: '0xBF801Fff6c25d943cFb98CC545CF0c67A6C94311'.toLowerCase(),
  },
};

export const networkNames = {
  1: 'ETH Mainnet',
  // 11155111: 'ETH Mainnet',
  // 3: 'Ropsten Testnet',
  // 4: 'Rinkeby Testnet',
  // 11155111: 'Görli Testnet',
  // 42: 'Kovan Testnet',
  // 56: 'Binance Smart Chain',
  // 77: 'Sokol Testnet',
  // 99: 'POA Network',
  // 100: 'Gnosis Chain',
  6661: 'Cybria Chain',
};

export const networkLabels = {
  1: 'Mainnet',
  // 11155111: 'ETH Mainnet',
  // 3: 'Ropsten',
  // 4: 'Rinkeby',
  // 5: 'Görli',
  // 42: 'Kovan',
  // 56: 'BSC',
  // 77: 'Sokol',
  // 99: 'POA',
  // 100: 'Gnosis Chain',
  6661: 'Cybria Chain',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  // 11155111: {
  //   name: 'Ethereum',
  //   symbol: 'ETH',
  // },
  // 56: {
  //   name: 'Binance Coin',
  //   symbol: 'BNB',
  // },
  6661: {
    name: 'CYBA',
    symbol: 'CYBA',
  },
};

const {
  REACT_APP_MAINNET_RPC_URL,
  // REACT_APP_BSC_RPC_URL,
  REACT_APP_CYBA_RPC_URL,
} = process.env;
export const chainUrls = {
  1: {
    rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
    explorer: 'https://etherscan.io/',
    chainId: 1,
    name: networkNames[1],
  },
  // 11155111: {
  //   rpc: REACT_APP_MAINNET_RPC_URL.split(' '),
  //   explorer: 'https://cybascan.io',
  //   chainId: 11155111,
  //   name: networkNames[11155111],
  // },
  // 56: {
  //   rpc: REACT_APP_BSC_RPC_URL.split(' '),
  //   explorer: 'https://bscscan.com',
  //   chainId: 56,
  //   name: networkNames[56],
  // },
  6661: {
    rpc: REACT_APP_CYBA_RPC_URL.split(' '),
    explorer: 'https://cybascan.io',
    chainId: 6661,
    name: networkNames[6661],
  },
};

export const defaultTokensUrl = {
  // 100: 'https://tokens.honeyswap.org',
  1: `${process.env.REACT_APP_URL}/tokenlist/eth_mainnet.json`,
  // 11155111:
    // 'https://raw.githubusercontent.com/Zedscan/TokenBridgeList/main/eth_mainnet.json',
  // 42: '',
  // 77: '',
  // 99: '',
  // 56: 'https://raw.githubusercontent.com/Zedscan/TokenBridgeList/main/bsc_mainnet.json',
  6661: `${process.env.REACT_APP_URL}/tokenlist/cyba_mainnet.json`,
};

export const GRAPH_HEALTH_ENDPOINT =
  'https://graph.cybria.io/index-node/graphql';

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  CYBA_RPC_URL: 'cyba-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
};

export const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN;
