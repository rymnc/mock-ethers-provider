const { expect } = require("chai");
const { MockProvider } = require("../lib/index.js");
const { abi, address } = require('./artifacts/TetherToken.json')
describe("Mock Provider", () => {
  let mockProvider;

  beforeEach(() => {
    mockProvider = new MockProvider();
  });

  it("Should initialize", () => {
    expect(mockProvider).to.not.eql(undefined);
  });

  it("Should initialize the empty contract map", () => {
    expect(mockProvider.mockedContracts.size).to.eql(0);
  });

  it("Should set a contract to be mocked", () => {
  	const map = mockProvider.setMockContract(address, abi)
	  expect(map).to.eql(new Map().set(address,{abi}))
  })

  it("Should get the function signature", () => {
  	const sig = mockProvider.toSignature('totalSupply()')
	expect(sig).to.eql('0x18160ddd')
  })

  //it("Should stub a function", () => {
  //	const map = mockProvider.stub(address, func, returnValue)
//	expect(map).to.eql(new Map().set(address,{abi, mockedFunctions: [{functionSignature: , returnValue: }]))
  //})
});
