require('dotenv').config();
const { MNEMONIC, INFURA_API_KEY } = process.env; // object destructuring
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  compilers: {
  solc: {
    version: "0.8.18" // or desired version 
  }
  },

  networks: {

    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: 11155111,
      confirmations: 2,    
      timeoutBlocks: 200,  
      skipDryRun: true  
      }
      }


}