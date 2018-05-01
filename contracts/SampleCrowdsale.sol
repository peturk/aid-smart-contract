pragma solidity ^0.4.18;

// import "./SafeMath.sol";
// import "./Crowdsale.sol";
// import "./CappedCrowdsale.sol";
// import "./RefundableCrowdsale.sol";
import "./MintedCrowdsale.sol";
import "./SampleCrowdsaleToken.sol";
// import "./FinalizableCrowdsale.sol";
import "./TimedCrowdsale.sol";
// import "./Vault.sol";


contract SampleCrowdsale is TimedCrowdsale, MintedCrowdsale, usingOraclize {

  
    function SampleCrowdsale
    (
        uint256 _openingTime, 
        uint256 _closingTime,
        uint256 _rate,
        address _wallet,
        MintableToken _token
    ) 
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime) {

    }

}
