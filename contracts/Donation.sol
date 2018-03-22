pragma solidity ^0.4.17; // Version of Solidity compiler to be used

contract Donation {
  mapping (address => uint) public balanceOf;
  event Transfer(address indexed donator, address indexed to, uint256 value);

  address public receiver;
  address public donator;

  function Donation(uint256 _supply) {
    balanceOf[msg.sender] = _supply;
  }

  // Send coins
  function transfer(address to, uint256 value) payable {
    // Check if sender has balance
    require(balanceOf[msg.sender] >= value);
    
    // Add and subtract new balances
    balanceOf[msg.sender] -= value;
    balanceOf[to] += value;    

    // Notify anyone listening that this transfer took place
    Transfer(msg.sender, to, value);
    // Sends ether to the donation receiver
    to.send(value);
  }
}
