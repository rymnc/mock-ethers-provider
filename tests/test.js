const { expect } = require("chai");
const { MockProvider } = require("../lib/index.js");
const { abi, address } = require("./artifacts/TetherToken.json");
const { testMap } = require("./mockedObjects");
const ethers = require("ethers");
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
    expect(map).to.eql(
      new Map().set(address, {
        interface: new ethers.utils.Interface(abi),
        mockedFunctions: new Map(),
      })
    );
  });

  it("Should get the function signature", () => {
    const sig = mockProvider.toSignature("totalSupply()");
    expect(sig).to.eql("0x18160ddd");
  });

  it("Should stub a function", () => {
    mockProvider.setMockContract(address, abi);
    mockProvider.stub(address, "totalSupply()", "0x1234");
    const map = mockProvider.stub(address, "MAX_UINT()", "0x721a");
    expect(map.mockedFunctions).to.eql(testMap);
  });

  it("Should restore the mocks to default", () => {
    mockProvider.restore();
    expect(mockProvider.mockedContracts.size).to.eql(0);
  });

  it("Should receive mock output", async () => {
    mockProvider.setMockContract(address, abi);
    mockProvider.stub(
      address,
      "totalSupply()",
      ethers.utils.parseEther("1234")
    );
    const contract = new ethers.Contract(address, abi, mockProvider);
    const supply = ethers.utils.formatEther(await contract.totalSupply());
    expect(supply).to.eql("1234.0");
    console.log(
      await contract.balanceOf("0xdAC17F958D2ee523a2206206994597C13D831ec7")
    );
  });
});
