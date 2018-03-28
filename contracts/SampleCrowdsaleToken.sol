pragma solidity 0.4.19;

import '../zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract SampleCrowdsaleToken is MintableToken {
  string public name = "AID COIN";
  string public symbol = "AID";
  uint256 public decimals = 18;
}
