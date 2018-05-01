pragma solidity ^0.4.18;

import "./MintableToken.sol";

contract SampleCrowdsaleToken is MintableToken {
    string public name = "Takk COIN";
    string public symbol = "Takk";
    uint256 public decimals = 18;
}
