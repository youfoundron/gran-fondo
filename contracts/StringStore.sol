pragma solidity ^0.4.24;

// Locally
import "chainlink/solidity/contracts/Chainlinked.sol";

// Remix
// import "github.com/smartcontractkit/chainlink/solidity/contracts/Chainlinked.sol";

// ROPSTEN CHAINLINK TOKEN ADDRESS  0x20fE562d797A42Dcb3399062AE9546cd06f63280
// ROPSTEN CHAINLINK ORACLE ADDRESS 0xc99B3D447826532722E41bc36e644ba3479E4365
// RINKEBY CHAINLINK TOKEN ADDRESS  0x01BE23585060835E02B77ef475b0Cc51aA1e0709
// RINKEBY CHAINLINK ORACLE ADDRESS 0xEfb76209b41DeC8b1FFA319F5880488CB4BbA797

contract StringStore is Chainlinked {
    constructor() public {
        setLinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setOracle(0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e);
    }

    bytes32 RINKEBY_BOOL_JOB = bytes32("4ce9b71a1ac94abcad1ff9198e760b8c");

    string public myString = "Hello World";

    function set(string memory x) public {
        myString = x;
    }

    function getSuccess() public returns (bytes32 requestId) {
        // newRequest takes a JobID, a callback address, and callback function as input
        Chainlink.Request memory req = newRequest(RINKEBY_BOOL_JOB, this, this.setSuccess.selector);
        req.add("get", "http://f2d75abe.ngrok.io/challenge-success");
        req.add("path", "success");
        requestId = chainlinkRequest(req, 1 * LINK);
    }

    bool public succeeded = false;
    event TestEvent(bool value); 

    function setSuccess(bytes32 _requestId, bool _succeeded)
        public recordChainlinkFulfillment(_requestId)
    {
        if(_succeeded) {
            emit TestEvent(_succeeded);
        }
        succeeded = _succeeded;
    }
}
