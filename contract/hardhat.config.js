require('@nomicfoundation/hardhat-toolbox');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
};
