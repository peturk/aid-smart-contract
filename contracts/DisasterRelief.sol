pragma solidity ^0.4.21;

import "./math/SafeMath.sol"
import "./Resources/Crowdsale.sol"
import "./Resources/TimedCrowdsale.sol"
import "./Resources/oraclizeAPI.sol"
import "./Resources/FinalizableCrowdsale.sol";
import "./utils/Vault.sol"


contract DisasterRelief is Crowdsale, TimedCrowdsale, FinalizableCrowdsale, usingOraclize {
    using SafeMath for uint256;

    address _walletRVK = 0x627306090abab3a6e1400e9345bc60c78a8bef57; // Address 0
    address _walletAK = 0xf17f52151ebef6c7334fad080c5704d77216b732; // 1
    address _walletISA = 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef; // 2
    address _walletEGIL = 0x821aea9a577a9b44299b9c15c88cf3087f3b5544; // 3
    address _closingADDR = 0x5aeda56215b167893e80b4fe645ba6d5bab767de; // Address 9

    Vault public vault;

    function DisasterRelief
    (
        uint256 _openingTime, 
        uint256 _closingTime,
        uint256 _rate,
        MintableToken _token
    ) 
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime){
            vault = new Vault(_closingADDR);
    }


}
