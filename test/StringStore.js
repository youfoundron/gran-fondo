const StringStore = artifacts.require('./StringStore.sol')

console.log('***', { StringStore })

contract('StringStore', accounts => {
  it("should store the string 'Hey there!'", async () => {
    const myContract = await StringStore.deployed()

    // Set myString to "Hey there!"
    await myContract.set('Hey there!', { from: accounts[0] })

    // Get myString from public variable getter
    const storedString = await myContract.myString.call()

    assert.equal(storedString, 'Hey there!', 'The string was not stored')
  })
})
