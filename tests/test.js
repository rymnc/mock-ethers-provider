const { expect } = require("chai");
const { MockProvider } = require("../lib/index.js");

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
});
