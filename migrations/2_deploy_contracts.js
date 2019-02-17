const StringStore = artifacts.require("StringStore")
const StravaChallengeHub = artifacts.require("StravaChallengeHub");

module.exports = async function(deployer) {
  await deployer.deploy(StringStore);
  await deployer.deploy(StravaChallengeHub);
};