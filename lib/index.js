const ethers = require("ethers");

class MockProvider extends ethers.providers.InfuraProvider {
  constructor(...args) {
    super(...args);
    this.mockedContracts = new Map();
  }
}

module.exports = {
  MockProvider,
};
