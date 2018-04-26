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

    string public weatherInfoRvk;

    event newOraclizeQuery(string description);
    event newWeatherInfo(string info);

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

    function weiToEth(uint256 amount) returns (uint256)
    {
        return amount * 10^18;
    }

    function weatherReader()
    {
        update(); // first check at contract creation
    }

    function __callback(bytes32 myid, string result)
    {
        if (msg.sender != oraclize_cbAddress()) throw;

        newWeatherInfo(result);
        weatherInfoRvk = result;

        weatherInfoRvk = weatherInfoRvk.toInt256(); // conversion TODO

        if(weatherInfoRvk > 10)
        {
            vault.payOut(_walletRVK, weiToEth(1));
        }
    }
    
    function update() payable
    {
        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        // updates every 60 ----- wind speed m/s from rvk
        oraclize_query(60, "URL", "json(http://apis.is/weather/observations/is?stations=1).results.F");
    }


}
