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
    mapping (uint => string[]) public athletesBySegmentChallengeId;
    mapping (uint => mapping(uint => bool)) athletesRegisteredBySegmentChallengeId;

    uint public numDistanceChallenges = 0;
    mapping (uint => DistanceChallenge) public distanceChallengesById;
    mapping (uint => string[]) public athletesByDistanceChallengeId;
    mapping (uint => mapping(uint => bool)) athletesRegisteredByDistanceChallengeId;
    
    // Events
    event ChallengeIssued (ChallengeType _challengeType, uint _challengeId);
    event ChallengeJoined (ChallengeType _challengeType, uint _challengeId, uint _athleteId);
    
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
    
    function isChallengeActive(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        uint expireTime = getChallengeExpireTime(_challengeType, _challengeId);
        return expireTime > now;
    }
    
    function isAthleteRegistered(ChallengeType _challengeType, uint _challengeId, uint _athleteId) public view returns (bool) {
        if (isSegmentChallenge(_challengeType))
            return athletesRegisteredBySegmentChallengeId[_challengeId][_athleteId];
        if (isDistanceChallenge(_challengeType))
            return athletesRegisteredByDistanceChallengeId[_challengeId][_athleteId];
    }
    
    function getChallengeEntryFee(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return segmentChallengesById[_challengeId].entryFee;
        if (isDistanceChallenge(_challengeType))
            return distanceChallengesById[_challengeId].entryFee;
    }
    
    function getNumChallengeAthletes(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        if (isSegmentChallenge(_challengeType))
            return athletesBySegmentChallengeId[_challengeId].length;
        if (isDistanceChallenge(_challengeType))
            return athletesByDistanceChallengeId[_challengeId].length;
    }
    
    function totalChallengeFunds(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint entryFee = getChallengeEntryFee(_challengeType, _challengeId);
        uint numAthletes = getNumChallengeAthletes(_challengeType, _challengeId);
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
    
    function settleChallenge (
        ChallengeType _challengeType,
        uint _challengeId
    ) public returns (bool) {

    }
    
}

