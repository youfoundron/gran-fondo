const StringStore = artifacts.require("./StringStore.sol");

console.log('***', { StringStore })

contract("StringStore", accounts => {
  it("should store the string 'Hey there!'", async () => {
    const StringStore = await StringStore.deployed();

    // Set myString to "Hey there!"
    await StringStore.set("Hey there!", { from: accounts[0] });

    // Get myString from public variable getter
    const StoredString = await StringStore.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});