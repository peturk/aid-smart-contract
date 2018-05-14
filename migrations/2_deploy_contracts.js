// const SampleCrowdsaleToken = artifacts.require('./SampleCrowdsaleToken.sol');
// const SampleCrowdsale = artifacts.require('./SampleCrowdsale.sol');

// module.exports = function(deployer, network, accounts) {
//     const openingTime = web3.eth.getBlock('latest').timestamp + 20; // twenty secs in the future
//     // const closingTime = openingTime + 86400 * 20; // 20 days
//     const closingTime = openingTime + 60*5; 
//     const rate = new web3.BigNumber(1);
//     const wallet = accounts[1];

//     return deployer
//         .then(() => {
//             return deployer.deploy(SampleCrowdsaleToken);
//         })
//         .then(() => {
//             return deployer.deploy(
//                 SampleCrowdsale,
//                 openingTime,
//                 closingTime,
//                 rate,
//                 wallet,
//                 200000000000000000000,
//                 SampleCrowdsaleToken.address,
//                 10000000000000000000
//             );
//         });
// };

var SampleCrowdsale = artifacts.require("SampleCrowdsale");
module.exports = function(deployer, network, accounts) {
    const startTime = Date.now()/1000|0 + 120;
    const endTime = startTime + (60*5); 
    const ethRate = new web3.BigNumber(1);
    const wallet = accounts[1];
deployer.deploy(SampleCrowdsale, startTime, endTime, ethRate, 100000000000000000000, 200000000000000000000, wallet);
};