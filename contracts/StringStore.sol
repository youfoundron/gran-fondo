pragma solidity ^0.4.24;

// Locally
import "chainlink/solidity/contracts/Chainlinked.sol";

// Remix
// import "github.com/smartcontractkit/chainlink/solidity/contracts/Chainlinked.sol";

contract StringStore is Chainlinked {
  constructor() public {
    setLinkToken(0x20fE562d797A42Dcb3399062AE9546cd06f63280);
    setOracle(0xB68145133973411b7B3F2726A625FE3f3808240D);
  }

  string public myString = "Hello World";

  function set(string memory x) public {
    myString = x;
  }
}
