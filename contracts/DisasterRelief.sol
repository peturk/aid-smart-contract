pragma solidity ^0.4.21;

import "./Resources/Crowdsale.sol"
import "./Resources/TimedCrowdsale.sol"
import "./Resources/oraclizeAPI.sol"

contract DisasterRelief is Crowdsale, TimedCrowdsale, usingOraclize {
    function DisasterRelief
    (
        uint256 _openingTime, 
        uint256 _closingTime,
        uint256 _rate, 
        address _walletRVK,
        address _walletAK,
        address _walletISA,
        address _walletEGIL,
        MintableToken _token
    ) 
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime){
    }
}
