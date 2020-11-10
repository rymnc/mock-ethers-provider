const ethers = require("ethers");

class MockProvider extends ethers.providers.InfuraProvider {
  constructor(...args) {
    super(...args);
    this.mockedContracts = new Map();
  }

  setMockContract(address, abi) {
    this.mockedContracts.set(address, {
      abi: abi,
      mockedFunctions: new Map()
    });
    return this.mockedContracts;
  }

  toSignature(func) {
    return ethers.utils.keccak256(Buffer.from(func)).substring(0, 10);
  }

    stub(address, func, returnValue) {
	const currentContract = this.mockedContracts.get(address)
  	currentContract.mockedFunctions.set(this.toSignature(func), returnValue)
	this.mockedContracts.set(address, currentContract)
	//Object.assign(this.mockedContracts.get(address), {mockedFunctions.push(funcMap)}
	    //)
	return this.mockedContracts.get(address)
  }
}

module.exports = {
  MockProvider,
};
