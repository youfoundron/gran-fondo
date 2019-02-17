pragma solidity ^0.4.24;

// File: contracts/Chainlink.sol
contract Chainlinked {
  using Chainlink for Chainlink.Request;
  using SafeMath for uint256;

  uint256 constant internal LINK = 10**18;
  uint256 constant private AMOUNT_OVERRIDE = 0;
  address constant private SENDER_OVERRIDE = 0x0;
  uint256 constant private ARGS_VERSION = 1;
  bytes32 constant private ENS_TOKEN_SUBNAME = keccak256("link");
  bytes32 constant private ENS_ORACLE_SUBNAME = keccak256("oracle");

  ENSInterface private ens;
  bytes32 private ensNode;
  LinkTokenInterface private link;
  ChainlinkRequestInterface private oracle;
  uint256 private requests = 1;
  mapping(bytes32 => address) private pendingRequests;

  event ChainlinkRequested(bytes32 indexed id);
  event ChainlinkFulfilled(bytes32 indexed id);
  event ChainlinkCancelled(bytes32 indexed id);

  /**
   * @notice Creates a request that can hold additional parameters
   * @param _specId The Job Specification ID that the request will be created for
   * @param _callbackAddress The callback address that the response will be sent to
   * @param _callbackFunctionSignature The callback function signature to use for the callback address
   * @return A Chainlink Request struct in memory
   */
  function newRequest(
    bytes32 _specId,
    address _callbackAddress,
    bytes4 _callbackFunctionSignature
  ) internal pure returns (Chainlink.Request memory) {
    Chainlink.Request memory req;
    return req.initialize(_specId, _callbackAddress, _callbackFunctionSignature);
  }

  /**
   * @notice Creates a Chainlink request to the stored oracle address
   * @dev Calls `chainlinkRequestTo` with the stored oracle address
   * @param _req The initialized Chainlink Request
   * @param _payment The amount of LINK to send for the request
   * @return The request ID
   */
  function chainlinkRequest(Chainlink.Request memory _req, uint256 _payment)
    internal
    returns (bytes32)
  {
    return chainlinkRequestTo(oracle, _req, _payment);
  }

  /**
   * @notice Creates a Chainlink request to the specified oracle address
   * @dev Generates and stores a request ID, increments the local nonce, and uses `transferAndCall` to
   * send LINK which creates a request on the target oracle contract.
   * Emits ChainlinkRequested event.
   * @param _oracle The address of the oracle for the request
   * @param _req The initialized Chainlink Request
   * @param _payment The amount of LINK to send for the request
   * @return The request ID
   */
  function chainlinkRequestTo(address _oracle, Chainlink.Request memory _req, uint256 _payment)
    internal
    returns (bytes32 requestId)
  {
    requestId = keccak256(abi.encodePacked(this, requests));
    _req.nonce = requests;
    pendingRequests[requestId] = _oracle;
    emit ChainlinkRequested(requestId);
    require(link.transferAndCall(_oracle, _payment, encodeRequest(_req)), "unable to transferAndCall to oracle");
    requests += 1;

    return requestId;
  }

  /**
   * @notice Allows a request to be cancelled if it has not been fulfilled
   * @dev Requires keeping track of the expiration value emitted from the oracle contract.
   * Deletes the request from the `pendingRequests` mapping.
   * Emits ChainlinkCancelled event.
   * @param _requestId The request ID
   * @param _payment The amount of LINK sent for the request
   * @param _callbackFunc The callback function specified for the request
   * @param _expiration The time of the expiration for the request
   */
  function cancelChainlinkRequest(
    bytes32 _requestId,
    uint256 _payment,
    bytes4 _callbackFunc,
    uint256 _expiration
  )
    internal
  {
    ChainlinkRequestInterface requested = ChainlinkRequestInterface(pendingRequests[_requestId]);
    delete pendingRequests[_requestId];
    emit ChainlinkCancelled(_requestId);
    requested.cancelOracleRequest(_requestId, _payment, _callbackFunc, _expiration);
  }

  /**
   * @notice Sets the stored oracle address
   * @param _oracle The address of the oracle contract
   */
  function setOracle(address _oracle) internal {
    oracle = ChainlinkRequestInterface(_oracle);
  }

  /**
   * @notice Sets the LINK token address
   * @param _link The address of the LINK token contract
   */
  function setLinkToken(address _link) internal {
    link = LinkTokenInterface(_link);
  }

  /**
   * @notice Retrieves the stored address of the LINK token
   * @return The address of the LINK token
   */
  function chainlinkToken()
    internal
    view
    returns (address)
  {
    return address(link);
  }

  /**
   * @notice Retrieves the stored address of the oracle contract
   * @return The address of the oracle contract
   */
  function oracleAddress()
    internal
    view
    returns (address)
  {
    return address(oracle);
  }

  /**
   * @notice Allows for a request which was created on another contract to be fulfilled
   * on this contract
   * @param _oracle The address of the oracle contract that will fulfill the request
   * @param _requestId The request ID used for the response
   */
  function addExternalRequest(address _oracle, bytes32 _requestId)
    internal
    notPendingRequest(_requestId)
  {
    pendingRequests[_requestId] = _oracle;
  }
 
  /**
   * @notice Sets the stored oracle and LINK token contracts with the addresses resolved by ENS
   * @dev Accounts for subnodes having different resolvers
   * @param _ens The address of the ENS contract
   * @param _node The ENS node hash
   */
  function setChainlinkWithENS(address _ens, bytes32 _node)
    internal
  {
    ens = ENSInterface(_ens);
    ensNode = _node;
    bytes32 linkSubnode = keccak256(abi.encodePacked(ensNode, ENS_TOKEN_SUBNAME));
    ENSResolver resolver = ENSResolver(ens.resolver(linkSubnode));
    setLinkToken(resolver.addr(linkSubnode));
    setOracleWithENS();
  }

  /**
   * @notice Sets the stored oracle contract with the address resolved by ENS
   * @dev This may be called on its own as long as `setChainlinkWithENS` has been called previously
   */
  function setOracleWithENS()
    internal
  {
    bytes32 oracleSubnode = keccak256(abi.encodePacked(ensNode, ENS_ORACLE_SUBNAME));
    ENSResolver resolver = ENSResolver(ens.resolver(oracleSubnode));
    setOracle(resolver.addr(oracleSubnode));
  }

  /**
   * @notice Encodes the request to be sent to the oracle contract
   * @dev The Chainlink node expects values to be in order for the request to be picked up. Order of types
   * will be validated in the oracle contract.
   * @param _req The initialized Chainlink Request
   * @return The bytes payload for the `transferAndCall` method
   */
  function encodeRequest(Chainlink.Request memory _req)
    internal
    view
    returns (bytes memory)
  {
    return abi.encodeWithSelector(
      oracle.oracleRequest.selector,
      SENDER_OVERRIDE, // Sender value - overridden by onTokenTransfer by the requesting contract's address
      AMOUNT_OVERRIDE, // Amount value - overridden by onTokenTransfer by the actual amount of LINK sent
      _req.id,
      _req.callbackAddress,
      _req.callbackFunctionId,
      _req.nonce,
      ARGS_VERSION,
      _req.buf.buf);
  }

  /**
   * @notice Ensures that the fulfillment is valid for this contract
   * @dev Use if the contract developer prefers methods instead of modifiers for validation
   * @param _requestId The request ID for fulfillment
   */
  function fulfillChainlinkRequest(bytes32 _requestId)
    internal
    recordChainlinkFulfillment(_requestId)
  {}

  /**
   * @dev Reverts if the sender is not the oracle of the request.
   * Emits ChainlinkFulfilled event.
   * @param _requestId The request ID for fulfillment
   */
  modifier recordChainlinkFulfillment(bytes32 _requestId) {
    require(msg.sender == pendingRequests[_requestId], "Source must be the oracle of the request");
    delete pendingRequests[_requestId];
    emit ChainlinkFulfilled(_requestId);
    _;
  }

  /**
   * @dev Reverts if the request is already pending
   * @param _requestId The request ID for fulfillment
   */
  modifier notPendingRequest(bytes32 _requestId) {
    require(pendingRequests[_requestId] == address(0), "Request is already pending");
    _;
  }
}


contract StravaChallengeHub is Chainlinked {
    // Libraries

    // Enums
    // https://solidity.readthedocs.io/en/v0.5.4/types.html?highlight=enum%20argument#enums
    enum ActivityType { Ride, Run, Swim }     // Strava activity type
    enum ChallengeType { Segment, Distance }  // Type of challenge
    
    // Structs
    struct SegmentChallenge {
        uint entryFee;              // amount ether to enter the challenge
        uint expireTime;            // datetime that challenge expires at (seconds)
        uint timeToBeat;            // time to complete segment in (seconds)
        uint segmentId;           // strava segment id
        ActivityType activityType;  // ride / run / swim (as uint)
    }
    struct DistanceChallenge {
        uint entryFee;              // amount ether to enter the challenge
        uint expireTime;            // datetime that challenge expires at (seconds)
        uint distance;              // distance to complete the challenge (feet)
        ActivityType activityType;  // ride / run / swim (as uint)
    }
    struct ChallengeMetaData {
        uint numChallenges;
        mapping (uint => bool) settled;
        mapping (uint => uint[]) athleteIds;
        mapping (uint => mapping(uint => bool)) athleteSucceeded;
        mapping (uint => mapping(uint => address)) athleteAddress;
    }

    // Storage vars
    mapping (uint => ChallengeMetaData) public challengeManager;
    mapping (uint => SegmentChallenge) public segmentChallengesById;
    mapping (uint => DistanceChallenge) public distanceChallengesById;

    // Events
    event ChallengeIssued (ChallengeType _challengeType, uint _challengeId);
    event ChallengeJoined (ChallengeType _challengeType, uint _challengeId, uint _athleteId, address _athleteAddress);
    event ChallengeSettled (ChallengeType _challengeType, uint _challengeId);
    event AthleteSucceeded (ChallengeType _challengeType, uint _challengeId, uint _athleteId);

    // Pure / View functions
    // ------------------------------------------------------
    function _getChallengeMetaData(ChallengeType _challengeType) internal view returns (ChallengeMetaData storage) {
        return challengeManager[uint(_challengeType)];
    }
    
    function isChallengeSettled(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        return _getChallengeMetaData(_challengeType).settled[_challengeId];
    }
    
    function isAthleteRegistered(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (bool) {
        return _getChallengeMetaData(_challengeType).athleteAddress[_challengeId][_athleteId] != address(0x0);
    }

    function isAthleteSuccessful(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (bool) {
        return _getChallengeMetaData(_challengeType).athleteSucceeded[_challengeId][_athleteId];
    }
    
    function getNumAthletes(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        return _getChallengeMetaData(_challengeType).athleteIds[_challengeId].length;
    }
    
    function getAthleteIdAtIndex(ChallengeType _challengeType, uint _challengeId, uint index) public view returns (uint) {
        return _getChallengeMetaData(_challengeType).athleteIds[_challengeId][index];
    }
    
    function getAthleteAddress(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (address paybale) {
        return _getChallengeMetaData(_challengeType).athleteAddress[_challengeId][_athleteId];
    }

    function isSegmentChallenge(ChallengeType _challengeType) public pure returns (bool) {
        return _challengeType == ChallengeType.Segment;
    }
    
    function isDistanceChallenge(ChallengeType _challengeType) public pure returns (bool) {
        return _challengeType == ChallengeType.Distance;
    }

    function getChallengeExpireTime(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return segmentChallengesById[_challengeId].expireTime;
        if (isDistanceChallenge(_challengeType))
            return distanceChallengesById[_challengeId].expireTime;
    }
    
    function getChallengeEntryFee(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return segmentChallengesById[_challengeId].entryFee;
        if (isDistanceChallenge(_challengeType))
            return distanceChallengesById[_challengeId].entryFee;
    }
    
    function isChallengeExpired(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        uint expireTime = getChallengeExpireTime(_challengeType, _challengeId);
        return now > expireTime;
    }

    function getAthleteIds(ChallengeType _challengeType, uint _challengeId) public view returns (uint[] memory) {
        return _getChallengeMetaData(_challengeType).athleteIds[_challengeId];
    }
    
    function getSuccessfulAthleteIds(ChallengeType _challengeType, uint _challengeId) public view returns (uint[] memory) {
        uint[] memory successfulAthleteIds;
        uint numAthletes = getNumAthletes(_challengeType, _challengeId);
        uint resultIndex = 0;
        
        // iterate over athlete ids, push successful ones to array
        for (uint index; index < numAthletes; index++) {
            uint _athleteId = getAthleteIdAtIndex(_challengeType, _challengeId, index);
            if (isAthleteSuccessful(_challengeType, _challengeId, _athleteId)) {
                successfulAthleteIds[resultIndex] = _athleteId;
                resultIndex++;
            }
        }
        
        return successfulAthleteIds;
    }
    
    function getTotalChallengeFunds(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint entryFee = getChallengeEntryFee(_challengeType, _challengeId);
        uint numAthletes = getNumAthletes(_challengeType, _challengeId);
        return entryFee * numAthletes;
    }
    
    // Destructive functions
    // ------------------------------------------------------
    function issueSegmentChallenge(
        uint _entryFee,
        uint _expireTime,
        uint _timeToBeat,
        uint _segmentId,
        ActivityType _activityType
    ) public returns (uint) {
        // initialize SegmentChallenge struct
        SegmentChallenge memory issuedSegmentChallenge = SegmentChallenge({
            entryFee: _entryFee,
            expireTime: _expireTime,
            timeToBeat: _timeToBeat,
            segmentId: _segmentId,
            activityType: _activityType
        });
        
        // Get the challenge id from the number of challenges
        uint _challengeId = _getChallengeMetaData(ChallengeType.Segment).numChallenges;
        
        // Add struct to challenges mapping
        segmentChallengesById[_challengeId] = issuedSegmentChallenge;
        
        // Increment the counter
        challengeManager[uint(ChallengeType.Segment)].numChallenges++;
        
        // Log ChallengeIssued event
        emit ChallengeIssued(ChallengeType.Segment, _challengeId);
        
        // return challengeId
        return _challengeId;
    }
    
    function issueDistanceChallenge(
        uint _entryFee,
        uint _expireTime,
        uint _distance,
        ActivityType _activityType
    ) public returns (uint) {
        // initialize DistanceChallenge struct
        DistanceChallenge memory issuedDistanceChallenge = DistanceChallenge({
            entryFee: _entryFee,
            expireTime: _expireTime,
            distance: _distance,
            activityType: _activityType
        });
        
        // Get the challenge id from the number of challenges
        uint _challengeId = _getChallengeMetaData(ChallengeType.Distance).numChallenges;
        
        // Add struct to challenges mapping
        distanceChallengesById[_challengeId] = issuedDistanceChallenge;
        
        // Increment the counter
        challengeManager[uint(ChallengeType.Distance)].numChallenges++;
        
        // Log ChallengeIssued event
        emit ChallengeIssued(ChallengeType.Distance, _challengeId);
        
        // return challengeId
        return _challengeId;
    }
    

    function joinChallenge (
        ChallengeType _challengeType,
        uint _challengeId,
        uint _athleteId
    ) public payable returns (bool) {
        // make sure challenge is not expired
        require(!isChallengeExpired(_challengeType, _challengeId));
        
        // make sure athlete hasn't joined the challenge already
        require(!isAthleteRegistered(_challengeType, _challengeId, _athleteId), "Athlete is already registered");

        // make sure sender is paying their full entry fee
        uint entryFee = getChallengeEntryFee(_challengeType, _challengeId);
        require(msg.value >= entryFee, "Entry fee (ether value) is insufficient");
    
        // flag athelete as registered for challenge
        challengeManager[uint(_challengeType)].athleteAddress[_challengeId][_athleteId] = msg.sender;

        // Log ChallengeJoined event
        emit ChallengeJoined(_challengeType, _challengeId, _athleteId, msg.sender);
        
        return true;
    }
    
    // TODO: Permissions
    function setAthleteSucceeded(
        ChallengeType _challengeType,
        uint _challengeId,
        uint _athleteId
    ) external returns (bool) {
        // check that challenge is not settled and the athlete is registered
        require(!isChallengeSettled(_challengeType, _challengeId));
        require(isAthleteRegistered(_challengeType, _challengeId, _athleteId));
        
        // flag athlete as successful
        challengeManager[uint(_challengeType)].athleteSucceeded[_challengeId][_athleteId] = true;
        
        // log AthleteSuceeded event
        emit AthleteSucceeded(_challengeType, _challengeId, _athleteId);
        
        return true;
    }
    
    // TODO: Permissions
    function settleChallenge (
        ChallengeType _challengeType,
        uint _challengeId
    ) external returns (bool) {
        // make sure challenge is expired and not settled
        require(isChallengeExpired(_challengeType, _challengeId));
        require(!isChallengeSettled(_challengeType, _challengeId));
        
        uint[] memory successfulAthleteIds = getSuccessfulAthleteIds(_challengeType, _challengeId);
        uint numAthletesSucceeded = successfulAthleteIds.length;
        uint totalChallengeFunds = getTotalChallengeFunds(_challengeType, _challengeId);
        uint rewardValue = totalChallengeFunds / numAthletesSucceeded;
        
        for (uint index = 0; index < numAthletesSucceeded; index++) {
            uint _athleteId = successfulAthleteIds[index];
            address _athleteAddress = getAthleteAddress(_challengeType, _challengeId, _athleteId);
            address recipient = address(uint160(_athleteAddress));
            recipient.transfer(rewardValue);
        }
        
        // flag challenge as settled
        challengeManager[uint(_challengeType)].settled[_challengeId] = true;
        
        // emit ChallengeSettled event
        emit ChallengeSettled(_challengeType, _challengeId);

        return true;
    }
}

// File: contracts/CBOR.sol
library CBOR {
    using Buffer for Buffer.buffer;

    uint8 private constant MAJOR_TYPE_INT = 0;
    uint8 private constant MAJOR_TYPE_NEGATIVE_INT = 1;
    uint8 private constant MAJOR_TYPE_BYTES = 2;
    uint8 private constant MAJOR_TYPE_STRING = 3;
    uint8 private constant MAJOR_TYPE_ARRAY = 4;
    uint8 private constant MAJOR_TYPE_MAP = 5;
    uint8 private constant MAJOR_TYPE_CONTENT_FREE = 7;

    function encodeType(Buffer.buffer memory buf, uint8 major, uint value) private pure {
        if(value <= 23) {
            buf.append(uint8((major << 5) | value));
        } else if(value <= 0xFF) {
            buf.append(uint8((major << 5) | 24));
            buf.appendInt(value, 1);
        } else if(value <= 0xFFFF) {
            buf.append(uint8((major << 5) | 25));
            buf.appendInt(value, 2);
        } else if(value <= 0xFFFFFFFF) {
            buf.append(uint8((major << 5) | 26));
            buf.appendInt(value, 4);
        } else if(value <= 0xFFFFFFFFFFFFFFFF) {
            buf.append(uint8((major << 5) | 27));
            buf.appendInt(value, 8);
        }
    }

    function encodeIndefiniteLengthType(Buffer.buffer memory buf, uint8 major) private pure {
        buf.append(uint8((major << 5) | 31));
    }

    function encodeUInt(Buffer.buffer memory buf, uint value) internal pure {
        encodeType(buf, MAJOR_TYPE_INT, value);
    }

    function encodeInt(Buffer.buffer memory buf, int value) internal pure {
        if(value >= 0) {
            encodeType(buf, MAJOR_TYPE_INT, uint(value));
        } else {
            encodeType(buf, MAJOR_TYPE_NEGATIVE_INT, uint(-1 - value));
        }
    }

    function encodeBytes(Buffer.buffer memory buf, bytes value) internal pure {
        encodeType(buf, MAJOR_TYPE_BYTES, value.length);
        buf.append(value);
    }

    function encodeString(Buffer.buffer memory buf, string value) internal pure {
        encodeType(buf, MAJOR_TYPE_STRING, bytes(value).length);
        buf.append(bytes(value));
    }

    function startArray(Buffer.buffer memory buf) internal pure {
        encodeIndefiniteLengthType(buf, MAJOR_TYPE_ARRAY);
    }

    function startMap(Buffer.buffer memory buf) internal pure {
        encodeIndefiniteLengthType(buf, MAJOR_TYPE_MAP);
    }

    function endSequence(Buffer.buffer memory buf) internal pure {
        encodeIndefiniteLengthType(buf, MAJOR_TYPE_CONTENT_FREE);
    }
}

// File: contracts/Buffer.sol
library Buffer {
    struct buffer {
        bytes buf;
        uint capacity;
    }

    uint constant capacityMask = (2 ** 256) - 32; // ~0x1f

    function init(buffer memory buf, uint _capacity) internal pure {
        uint capacity = max(32, (_capacity + 0x1f) & capacityMask);
        // Allocate space for the buffer data
        buf.capacity = capacity;
        assembly {
            let ptr := mload(0x40)
            mstore(buf, ptr)
            mstore(ptr, 0)
            mstore(0x40, add(ptr, capacity))
        }
    }

    function resize(buffer memory buf, uint capacity) private pure {
        bytes memory oldbuf = buf.buf;
        init(buf, capacity);
        append(buf, oldbuf);
    }

    function max(uint a, uint b) private pure returns(uint) {
        if(a > b) {
            return a;
        }
        return b;
    }

    /**
     * @dev Appends a byte array to the end of the buffer. Resizes if doing so
     * would exceed the capacity of the buffer.
     * @param buf The buffer to append to.
     * @param data The data to append.
     * @return The original buffer.
     */
    function append(buffer memory buf, bytes data) internal pure returns(buffer memory) {
        if(data.length + buf.buf.length > buf.capacity) {
            resize(buf, max(buf.capacity, data.length) * 2);
        }

        uint dest;
        uint src;
        uint len = data.length;
        assembly {
            // Memory address of the buffer data
            let bufptr := mload(buf)
            // Length of existing buffer data
            let buflen := mload(bufptr)
            // Start address = buffer address + buffer length + sizeof(buffer length)
            dest := add(add(bufptr, buflen), 32)
            // Update buffer length
            mstore(bufptr, add(buflen, mload(data)))
            src := add(data, 32)
        }

        // Copy word-length chunks while possible
        for(; len >= 32; len -= 32) {
            assembly {
                mstore(dest, mload(src))
            }
            dest += 32;
            src += 32;
        }

        // Copy remaining bytes
        uint mask = 256 ** (32 - len) - 1;
        assembly {
            let srcpart := and(mload(src), not(mask))
            let destpart := and(mload(dest), mask)
            mstore(dest, or(destpart, srcpart))
        }

        return buf;
    }

    /**
     * @dev Appends a byte to the end of the buffer. Resizes if doing so would
     * exceed the capacity of the buffer.
     * @param buf The buffer to append to.
     * @param data The data to append.
     * @return The original buffer.
     */
    function append(buffer memory buf, uint8 data) internal pure {
        if(buf.buf.length + 1 > buf.capacity) {
            resize(buf, buf.capacity * 2);
        }

        assembly {
            // Memory address of the buffer data
            let bufptr := mload(buf)
            // Length of existing buffer data
            let buflen := mload(bufptr)
            // Address = buffer address + buffer length + sizeof(buffer length)
            let dest := add(add(bufptr, buflen), 32)
            mstore8(dest, data)
            // Update buffer length
            mstore(bufptr, add(buflen, 1))
        }
    }

    /**
     * @dev Appends a byte to the end of the buffer. Resizes if doing so would
     * exceed the capacity of the buffer.
     * @param buf The buffer to append to.
     * @param data The data to append.
     * @return The original buffer.
     */
    function appendInt(buffer memory buf, uint data, uint len) internal pure returns(buffer memory) {
        if(len + buf.buf.length > buf.capacity) {
            resize(buf, max(buf.capacity, len) * 2);
        }

        uint mask = 256 ** len - 1;
        assembly {
            // Memory address of the buffer data
            let bufptr := mload(buf)
            // Length of existing buffer data
            let buflen := mload(bufptr)
            // Address = buffer address + buffer length + len
            let dest := add(add(bufptr, buflen), len)
            mstore(dest, or(and(mload(dest), not(mask)), data))
            // Update buffer length
            mstore(bufptr, add(buflen, len))
        }
        return buf;
    }
}

/**
 * @title Library for common Chainlink functions
 * @dev Uses imported CBOR library for encoding to buffer
 */
library Chainlink {
  uint256 internal constant defaultBufferSize = 256;

  using CBOR for Buffer.buffer;

  struct Request {
    bytes32 id;
    address callbackAddress;
    bytes4 callbackFunctionId;
    uint256 nonce;
    Buffer.buffer buf;
  }

  /**
   * @notice Initializes a Chainlink request
   * @dev Sets the ID, callback address, and callback function signature on the request
   * @param self The uninitialized request
   * @param _id The Job Specification ID
   * @param _callbackAddress The callback address
   * @param _callbackFunction The callback function signature
   * @return The initialized request
   */
  function initialize(
    Request memory self,
    bytes32 _id,
    address _callbackAddress,
    bytes4 _callbackFunction
  ) internal pure returns (Chainlink.Request memory) {
    Buffer.init(self.buf, defaultBufferSize);
    self.id = _id;
    self.callbackAddress = _callbackAddress;
    self.callbackFunctionId = _callbackFunction;
    return self;
  }

  /**
   * @notice Sets the data for the buffer without encoding CBOR on-chain
   * @dev CBOR can be closed with curly-brackets {} or they can be left off
   * @param self The initialized request
   * @param _data The CBOR data
   */
  function setBuffer(Request memory self, bytes _data)
    internal pure
  {
    Buffer.init(self.buf, _data.length);
    Buffer.append(self.buf, _data);
  }

  /**
   * @notice Adds a string value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The string value to add
   */
  function add(Request memory self, string _key, string _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeString(_value);
  }

  /**
   * @notice Adds a bytes value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The bytes value to add
   */
  function addBytes(Request memory self, string _key, bytes _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeBytes(_value);
  }

  /**
   * @notice Adds a int256 value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The int256 value to add
   */
  function addInt(Request memory self, string _key, int256 _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeInt(_value);
  }

  /**
   * @notice Adds a uint256 value to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _value The uint256 value to add
   */
  function addUint(Request memory self, string _key, uint256 _value)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.encodeUInt(_value);
  }

  /**
   * @notice Adds an array of strings to the request with a given key name
   * @param self The initialized request
   * @param _key The name of the key
   * @param _values The array of string values to add
   */
  function addStringArray(Request memory self, string _key, string[] memory _values)
    internal pure
  {
    self.buf.encodeString(_key);
    self.buf.startArray();
    for (uint256 i = 0; i < _values.length; i++) {
      self.buf.encodeString(_values[i]);
    }
    self.buf.endSequence();
  }
}

// File: contracts/ENSResolver.sol

contract ENSResolver {
  function addr(bytes32 node) public view returns (address);
}

// File: contracts/interfaces/ENSInterface.sol


interface ENSInterface {

    // Logged when the owner of a node assigns a new owner to a subnode.
    event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner);

    // Logged when the owner of a node transfers ownership to a new account.
    event Transfer(bytes32 indexed node, address owner);

    // Logged when the resolver for a node changes.
    event NewResolver(bytes32 indexed node, address resolver);

    // Logged when the TTL of a node changes
    event NewTTL(bytes32 indexed node, uint64 ttl);


    function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external;
    function setResolver(bytes32 node, address resolver) external;
    function setOwner(bytes32 node, address owner) external;
    function setTTL(bytes32 node, uint64 ttl) external;
    function owner(bytes32 node) external view returns (address);
    function resolver(bytes32 node) external view returns (address);
    function ttl(bytes32 node) external view returns (uint64);

}

// File: contracts/interfaces/LinkTokenInterface.sol


interface LinkTokenInterface {
  function allowance(address owner, address spender) external returns (bool success);
  function approve(address spender, uint256 value) external returns (bool success);
  function balanceOf(address owner) external returns (uint256 balance);
  function decimals() external returns (uint8 decimalPlaces);
  function decreaseApproval(address spender, uint256 addedValue) external returns (bool success);
  function increaseApproval(address spender, uint256 subtractedValue) external;
  function name() external returns (string tokenName);
  function symbol() external returns (string tokenSymbol);
  function totalSupply() external returns (uint256 totalTokensIssued);
  function transfer(address to, uint256 value) external returns (bool success);
  function transferAndCall(address to, uint256 value, bytes data) external returns (bool success);
  function transferFrom(address from, address to, uint256 value) external returns (bool success);
}

// File: contracts/interfaces/ChainlinkRequestInterface.sol

interface ChainlinkRequestInterface {
  function oracleRequest(
    address sender,
    uint256 payment,
    bytes32 id,
    address callbackAddress,
    bytes4 callbackFunctionId,
    uint256 nonce,
    uint256 version,
    bytes data
  ) external;

  function cancelOracleRequest(
    bytes32 requestId,
    uint256 payment,
    bytes4 callbackFunctionId,
    uint256 expiration
  ) external;
}

// File: contracts/SafeMath.sol

/**
 * @title SafeMath
 * @dev Unsigned math operations with safety checks that revert on error
 */
library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b);

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}

// File: contracts/Chainlinked.sol

/**
 * @title The Chainlinked contract
 * @notice Contract writers can inherit this contract in order to create requests for the
 * Chainlink network
 */
