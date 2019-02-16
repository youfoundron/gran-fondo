const StravaChallengeHub = artifacts.require("StravaChallengeHub");

module.exports = async function(deployer) {
  await deployer.deploy(StravaChallengeHub);
};