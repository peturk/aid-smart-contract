pragma solidity ^0.4.21;

import "./MintableToken.sol";

contract DisasterReliefToken is MintableToken {
    string public name = "Takk COIN";
    string public symbol = "Takk";
    uint256 public decimals = 18;
}
