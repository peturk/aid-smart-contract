const SampleCrowdsaleToken = artifacts.require('./SampleCrowdsaleToken.sol');
const SampleCrowdsale = artifacts.require('./SampleCrowdsale.sol');

module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 20; // twenty secs in the future
    const closingTime = openingTime + 1800; // 30 min
    const rate = new web3.BigNumber(1); // the rate is 1 token per 1 Eth
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
                SampleCrowdsaleToken.address,
            );
        });
};
