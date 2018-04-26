/*
   This contract keeps in storage a reference
   to Icelandic weather information.
*/


pragma solidity ^0.4.21;
import "./oraclizeAPI.sol";


contract weatherReader is usingOraclize {
    
    uint public weatherInfo;

    event newOraclizeQuery(string description);
    event newWeatherInfo(int info);

    function weatherReader() {
        update(); // first check at contract creation
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        newWeatherInfo(result);
        weatherInfo = result;
        // do something with the weatherInfo
    }
    
    function update() payable {
        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        oraclize_query("URL", "xml(https://www.http://apis.is/weather/forecasts/is?stations=1).results.forecast.F");
    }
    
}