const StravaChallengeHub = artifacts.require("StravaChallengeHub");

const CHALLENGE_TYPES = { SEGMENT: 0, DISTANCE: 1 }
const ATHLETE_IDS = [
  34138249,
  1781900,
  13580563,
  13332308,
]

module.exports = async function(deployer, network, accounts) {
  try {
    const web3 = StravaChallengeHub.web3;
    const { contract } = await StravaChallengeHub.deployed();

    // !!! magic number !!!
    const challengeId = 0;

    // Join segment challenges
    for (let challengeTypeKey of Object.keys(CHALLENGE_TYPES)) {
      const challengeType = CHALLENGE_TYPES[challengeTypeKey]
      for (let i = 0; i < ATHLETE_IDS.length; i++) {
        const account = accounts[i]
        const athleteId = ATHLETE_IDS[i]
        
        const entryFee = await contract.methods.getChallengeEntryFee(challengeType, challengeId).call()
        
        const joinChallengeTx = await contract.methods.joinChallenge(
          challengeType,
          challengeId,
          athleteId
        ).send({ from: account, value: entryFee })
        
        const { _athleteId, _athleteAddress, _challengeId } = joinChallengeTx.events.ChallengeJoined.returnValues
        console.log(`Athlete ${_athleteId} at address ${_athleteAddress} joined ${challengeTypeKey} challenge ${_challengeId}`)
      }
    }
  } catch (err) {
    console.log('Seeding Error', err)
  }
};