pragma solidity ^0.4.21;

import "./SampleCrowdsaleToken.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
// import "../node_modules/zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
//import "../node_modules/zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/distribution/FinalizableCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
contract SampleCrowdsale is MintedCrowdsale, FinalizableCrowdsale {
    function SampleCrowdsale
    (
        uint256 _openingTime, 
        uint256 _closingTime,
        uint256 _rate, 
        address _wallet, 
  //      uint256 _cap, 
        MintableToken _token 
  //      uint256 _goal
    ) 
    public 
    Crowdsale(_rate, _wallet, _token)
//    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    {

    }
}
