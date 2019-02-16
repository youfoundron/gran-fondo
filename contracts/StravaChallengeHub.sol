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

    uint public numDistanceChallenges = 0;
    mapping (uint => DistanceChallenge) public distanceChallengesById;
    mapping (uint => string[]) public athletesByDistanceChallengeId;
    
    // Events
    event ChallengeIssued (ChallengeType _challengeType, uint _challengeId);
    event ChallengeJoined (ChallengeType _challengeType, uint _challengeId, string _athleteId);
    
    // View functions
    // ------------------------------------------------------
    function getChallengeExpireTime(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint expireTime;
        if (_challengeType == ChallengeType.Segment) {
            expireTime = segmentChallengesById[_challengeId].expireTime;
        } else if (_challengeType == ChallengeType.Distance) {
            expireTime = distanceChallengesById[_challengeId].expireTime;
        }
        return expireTime;
    }
    
    function isChallengeActive(ChallengeType _challengeType, uint _challengeId) public view returns (bool) {
        uint expireTime = getChallengeExpireTime(_challengeType, _challengeId);
        return expireTime > now;
    }
    
    function getChallengeEntryFee(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint entryFee;
        if (_challengeType == ChallengeType.Segment) {
            entryFee = segmentChallengesById[_challengeId].entryFee;
        } else if (_challengeType == ChallengeType.Distance) {
            entryFee = distanceChallengesById[_challengeId].entryFee;
        }
        return entryFee;
    }
    
    function getNumChallengeAthletes(ChallengeType _challengeType, uint _challengeId) public view returns (uint) {
        uint numAthletes;
        if (_challengeType == ChallengeType.Segment) {
            numAthletes = athletesBySegmentChallengeId[_challengeId].length;
        } else if (_challengeType == ChallengeType.Distance) {
            numAthletes = athletesByDistanceChallengeId[_challengeId].length;
        }
        return numAthletes;
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
        
    }
    
    function settleChallenge (
        ChallengeType _challengeType,
        uint _challengeId
    ) public returns (bool) {
        
    }
    
}

