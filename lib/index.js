const ethers = require("ethers");

class MockProvider extends ethers.providers.InfuraProvider {
  constructor(...args) {
    super(...args);
    this.mockedContracts = new Map();
  }

  setMockContract(address, abi) {
  	this.mockedContracts.set(address,{
		abi: abi
	})
	return this.mockedContracts;
  }
  
  toSignature(func) {
  	return ethers.utils.keccak256(Buffer.from(func)).substring(0,10)
  }

//  stub(address, func, returnValue) {
  //	this.mockedContracts.set(address, {
//		..., mockedFunctions: [{
//			functionSignature: this.toSignature(func),
//			returnValue: returnValue
//		}
//		]
//	})
  //}
}

module.exports = {
  MockProvider,
};
