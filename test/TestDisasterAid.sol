pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/DisasterAid.sol";

contract TestAdoption {
  DisasterAid disasterAid = DisasterAid(DeployedAddresses.DisasterAid());

}
