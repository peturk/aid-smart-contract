pragma solidity ^0.4.17; // Version of Solidity compiler to be used

contract Donation {
  address[16] public donators;

  function donation(uint receiverId) public returns (uint) {
    // check if some weather based requirements are met?
    // require(...);
    donators[receiverId] = msg.sender;

    //return receiverId;
  }

  // Retrieving the donators
  function getDonators() public view returns (address[16]) {
    return donators;
  }

}
