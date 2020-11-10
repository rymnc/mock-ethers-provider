const ethers = require("ethers");

class MockProvider extends ethers.providers.InfuraProvider {
  constructor(...args) {
    super(...args);
    this.mockedContracts = new Map();
  }

  setMockContract(address, abi) {
    this.mockedContracts.set(address, {
      interface: new ethers.utils.Interface(abi),
      mockedFunctions: new Map(),
    });
    return this.mockedContracts;
  }

  toSignature(func) {
    return this.parseSignature(ethers.utils.keccak256(Buffer.from(func)));
  }

  parseSignature(str) {
    return str.substring(0, 10);
  }

  stub(address, func, ...returnValue) {
    const currentContract = this.mockedContracts.get(address);
    currentContract.mockedFunctions.set(currentContract.interface.getSighash(func), returnValue);
    this.mockedContracts.set(address, currentContract);
    return this.mockedContracts.get(address);
  }

  restore() {
    this.mockedContracts.clear();
  }

  getKey(map, val) {
    return [...map].find(([key, value]) => val == value);
  }

  async perform(method, params) {
    if (method !== "call") {
      return super.perform(method, params);
    }
    const mock = this.mockedContracts.get(params.transaction.to);
    if (mock === undefined) {
      return super.perform(method, params);
    }
    const functionSignature = this.parseSignature(params.transaction.data);
    if (mock.mockedFunctions.get(functionSignature) === undefined) {
      return super.perform(method, params);
    }
    const cointerface = mock.interface;
    const fragment = cointerface.getFunction(functionSignature);
    return cointerface.encodeFunctionResult(
      fragment,
      mock.mockedFunctions.get(functionSignature)
    );
  }
}

module.exports = {
  MockProvider,
};
