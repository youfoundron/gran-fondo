pragma solidity ^0.5.0;
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract StravaChallengeHub {
    // Libraries
    using SafeMath for uint;

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
    
    // Storage vars
    uint public numSegmentChallenges = 0;
    mapping (uint => SegmentChallenge) public segmentChallengesById;
    mapping (uint => bool) public segmentChallengesSettledById;
    mapping (uint => uint[]) public athletesBySegmentChallengeId;
    mapping (uint => mapping(uint => bool)) athletesRegisteredBySegmentChallengeId;
    mapping (uint => mapping(uint => bool)) athletesSucceededBySegmentChallengeId;

    uint public numDistanceChallenges = 0;
    mapping (uint => DistanceChallenge) public distanceChallengesById;
    mapping (uint => bool) public distanceChallengesSettledById;
    mapping (uint => uint[]) public athletesByDistanceChallengeId;
    mapping (uint => mapping(uint => bool)) athletesRegisteredByDistanceChallengeId;
    mapping (uint => mapping(uint => bool)) athletesSucceededByDistanceChallengeId;
    
    // Events
    event ChallengeIssued (ChallengeType _challengeType, uint _challengeId);
    event ChallengeJoined (ChallengeType _challengeType, uint _challengeId, uint _athleteId);
    event ChallengeSettled (ChallengeType _challengeType, uint _challengeId);
    
    // Pure / View functions
    // ------------------------------------------------------
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
    
    function isChallengeExpired(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        uint expireTime = getChallengeExpireTime(_challengeType, _challengeId);
        return now > expireTime;
    }
    
    function isChallengeSettled(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        if (isSegmentChallenge(_challengeType))
            return segmentChallengesSettledById[_challengeId];
        if (isDistanceChallenge(_challengeType))
            return distanceChallengesSettledById[_challengeId];
    }
    
    function isAthleteRegistered(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (bool) {
        if (isSegmentChallenge(_challengeType))
            return athletesRegisteredBySegmentChallengeId[_challengeId][_athleteId];
        if (isDistanceChallenge(_challengeType))
            return athletesRegisteredByDistanceChallengeId[_challengeId][_athleteId];
    }
    
    function isAthleteSucceeded(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (bool) {
        if (isSegmentChallenge(_challengeType))
            return athletesSucceededByDistanceChallengeId[_challengeId][_athleteId];
        if (isDistanceChallenge(_challengeType))
            return athletesSucceededByDistanceChallengeId[_challengeId][_athleteId];
    }
    
    function getChallengeEntryFee(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return segmentChallengesById[_challengeId].entryFee;
        if (isDistanceChallenge(_challengeType))
            return distanceChallengesById[_challengeId].entryFee;
    }
    
    function getNumAthletes(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return athletesBySegmentChallengeId[_challengeId].length;
        if (isDistanceChallenge(_challengeType))
            return athletesByDistanceChallengeId[_challengeId].length;
    }
    
    function getAthleteIdAtIndex(ChallengeType _challengeType, uint _challengeId, uint index) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return athletesBySegmentChallengeId[_challengeId][index];
        if (isDistanceChallenge(_challengeType))
            return athletesByDistanceChallengeId[_challengeId][index];
    }
    
    function getSucceededAthleteIds(ChallengeType _challengeType, uint _challengeId) public view returns (uint[] memory) {
        uint[] memory resultArr;
        uint numAthletes = getNumAthletes(_challengeType, _challengeId);
        uint resultArrIndex = 0;
        
        // iterate over challenge athletes, push successful ones to array
        for (uint index; index < numAthletes; index++) {
            uint _athleteId = getAthleteIdAtIndex(_challengeType, _challengeId, index);
            if (isAthleteSucceeded(_challengeType, _challengeId, _athleteId)) {
                resultArr[resultArrIndex] = _athleteId;
                resultArrIndex++;
            }
        }
        
        return resultArr;
    }
    
    function getNumAthletesSucceeded(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        return getSucceededAthleteIds(_challengeType, _challengeId).length;
    }
    
    function getTotalChallengeFunds(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint entryFee = getChallengeEntryFee(_challengeType, _challengeId);
        uint numAthletes = getNumAthletes(_challengeType, _challengeId);
        return entryFee.mul(numAthletes);
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
        
        // Add struct to challenges mapping
        segmentChallengesById[numSegmentChallenges] = issuedSegmentChallenge;
        
        // get the challengeId and increment counter
        uint _challengeId = numSegmentChallenges++;
        
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
        
        // Add struct to challenges mapping
        distanceChallengesById[numDistanceChallenges] = issuedDistanceChallenge;
        
        // get the challengeId and increment counter
        uint _challengeId = numDistanceChallenges++;
        
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
        if (isSegmentChallenge(_challengeType))
            athletesRegisteredBySegmentChallengeId[_challengeId][_athleteId] = true;
        if (isDistanceChallenge(_challengeType))
            athletesRegisteredByDistanceChallengeId[_challengeId][_athleteId] = true;

        // Log ChallengeJoined event
        emit ChallengeJoined(_challengeType, _challengeId, _athleteId);
        
        return true;
    }
    
    // TODO: Permissions
    function setAthleteSucceeded(
        ChallengeType _challengeType,
        uint _challengeId,
        uint _athleteId
    ) external returns (bool) {
        
    }
    
    // TODO: Permissions
    function settleChallenge (
        ChallengeType _challengeType,
        uint _challengeId
    ) external returns (bool) {
        // make sure challenge is not settled
        require(!isChallengeSettled(_challengeType, _challengeId));
        
        uint[] memory succeededAthleteIds = getSucceededAthleteIds(_challengeType, _challengeId);
        uint numAthletesSucceeded = succeededAthleteIds.length;
        uint totalChallengeFunds = getTotalChallengeFunds(_challengeType, _challengeId);
        uint rewardValue = totalChallengeFunds.div(numAthletesSucceeded);
        
        for (uint index = 0; index < numAthletesSucceeded; index++) {
            /* ... pay people ... */
        }
        
        // flag challenge as settled
        if (isSegmentChallenge(_challengeType))
            segmentChallengesSettledById[_challengeId] = true;
        if (isDistanceChallenge(_challengeType))
            distanceChallengesSettledById[_challengeId] = true;
        
        // emit ChallengeSettled event
        emit ChallengeSettled(_challengeType, _challengeId);

        return true;
    }
    
}

