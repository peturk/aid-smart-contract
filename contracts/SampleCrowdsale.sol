pragma solidity ^0.4.18;

import "./Crowdsale.sol";
import "./CappedCrowdsale.sol";
import "./RefundableCrowdsale.sol";
import "./MintedCrowdsale.sol";

import "./MintableToken.sol";

contract SampleCrowdsaleToken is MintableToken {
    string public name = "Takk COIN";
    string public symbol = "Takk";
    uint256 public decimals = 18;
}

contract SampleCrowdsale is CappedCrowdsale, RefundableCrowdsale {

    // using SafeMath for uint256;

    string public weatherInfoRvk;

    function SampleCrowdsale (
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _rate,
        uint256 _goal,
        uint256 _cap,
        address _wallet
    )
        public
        CappedCrowdsale(_cap)
        FinalizableCrowdsale()
        RefundableCrowdsale(_goal)
        Crowdsale(_openingTime, _closingTime, _rate, _wallet)
    {
        require(_goal <= _cap);
    }

    function createTokenContract() internal returns (MintableToken) {
        return new SampleCrowdsaleToken();
    }


}
