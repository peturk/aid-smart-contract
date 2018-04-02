pragma solidity ^0.4.21;

import "./SampleCrowdsaleToken.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/zeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";

contract SampleCrowdsale is CappedCrowdsale, RefundableCrowdsale, MintedCrowdsale {
    function SampleCrowdsale
    (
        uint256 _openingTime, 
        uint256 _closingTime,
        uint256 _rate, 
        address _wallet, 
        uint256 _cap, 
        MintableToken _token, 
        uint256 _goal
    ) 
        public
        Crowdsale(_rate, _wallet, _token)
        CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
        RefundableCrowdsale(_goal) {
        //As goal needs to be met for a successful crowdsale
        //the value needs to less or equal than a cap which is limit for accepted funds
        require(_goal <= _cap);
    }
}
