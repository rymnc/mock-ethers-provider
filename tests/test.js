const { expect } = require("chai");
const { MockProvider } = require("../lib/index.js");
const { abi, address } = require("./artifacts/TetherToken.json");
const { testMap } = require('./mockedObjects')

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
    const map = mockProvider.setMockContract(address, abi);
    expect(map).to.eql(new Map().set(address, { abi, mockedFunctions: new Map() }));
  });

  it("Should get the function signature", () => {
    const sig = mockProvider.toSignature("totalSupply()");
    expect(sig).to.eql("0x18160ddd");
  });

  it("Should stub a function", () => {
	  mockProvider.setMockContract(address, abi)
  	mockProvider.stub(address, 'totalSupply()', '0x1234')
	const map =   mockProvider.stub(address, 'MAX_UINT()', '0x721a')
  	expect(map.mockedFunctions).to.eql(testMap)
  })
});
