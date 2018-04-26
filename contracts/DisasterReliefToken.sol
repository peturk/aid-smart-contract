pragma solidity ^0.4.21;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract DisasterReliefToken is MintableToken {
    string public name = "Takk COIN";
    string public symbol = "Takk";
    uint256 public decimals = 18;
}
