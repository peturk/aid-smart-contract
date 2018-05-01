const SampleCrowdsaleToken = artifacts.require('./SampleCrowdsaleToken.sol');
const SampleCrowdsale = artifacts.require('./SampleCrowdsale.sol');

module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 20; // twenty secs in the future
    const closingTime = openingTime + 86400 * 20; // 20 days
    const rate = new web3.BigNumber(1000);
    const wallet = accounts[1];

    return deployer
        .then(() => {
            return deployer.deploy(SampleCrowdsaleToken);
        })
        .then(() => {
            return deployer.deploy(
                SampleCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                200000000000000000000,
                SampleCrowdsaleToken.address,
                100000000000000000000
            );
        });
};
