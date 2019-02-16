const StravaChallengeHub = artifacts.require("StravaChallengeHub");
const m = require('moment');

const MILE = 5280 // in feet
const ACTIVITY_TYPES = { RIDE: 0, RUN: 1, SWIM: 2 }

module.exports = async function(deployer) {
  try {
    const web3 = StravaChallengeHub.web3;
    const contract = await StravaChallengeHub.deployed();
  
    // Get a 10 minute time on Hawk Hill
    const segmentChallengeParams = {
      _entryFee:     web3.utils.toWei('0.5'), // 0.5 ETH
      _expireTime:   m().add(m.duration(1, 'week')).unix(), // 1 week from now
      _timeToBeat:   m.duration(10, 'minutes').asSeconds(), // 10 minutes
      _segmentId:    52271403536, // hawk hill
      _activityType: ACTIVITY_TYPES.RIDE
    }
    const issueSegmentChallengeTx = await contract.issueSegmentChallenge(...Object.values(segmentChallengeParams))
    const segmentChallengeId = issueSegmentChallengeTx.receipt.logs[0].args._challengeId.toNumber()
    console.log(`Issued Segment Challenge with id ${segmentChallengeId}`)
    
    // Run 50 miles in the next 30 days
    const distanceChallengeParams = {
      _entryFee:     web3.utils.toWei('0.25'), // 0.25 ETH
      _expireTime:   m().add(m.duration(30, 'days')).unix(), // 1 month from now
      _distance:     50 * MILE, // 50 miles
      _activityType: ACTIVITY_TYPES.RUN
    }
    const issueDistanceChallengeTx = await contract.issueDistanceChallenge(...Object.values(distanceChallengeParams))
    const distanceChallengeId = issueDistanceChallengeTx.receipt.logs[0].args._challengeId.toNumber()
    console.log(`Issued Distance Challenge with id ${distanceChallengeId}`)

  } catch (err) {
    console.log('Seeding Error', err)
  }
};