const DisasterReliefToken = artifacts.require('./DisasterReliefToken.sol');
const DisasterRelief = artifacts.require('./DisasterRelief.sol');

module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 20; // twenty secs in the future
    const closingTime = openingTime + 1800; // 30 min
    const rate = new web3.BigNumber; // the rate is 1 token per 1 Eth

    return deployer
        .then(() => {
            return deployer.deploy(DisasterReliefToken);
        })
        .then(() => {
            return deployer.deploy(
                DisasterRelief,
                openingTime,
                closingTime,
                rate,
                DisasterReliefToken.address,
            );
        });
};
