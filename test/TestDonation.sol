pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Donation.sol";

contract TestDonation {
  Donation donation = Donation(DeployedAddresses.Donation());

}
