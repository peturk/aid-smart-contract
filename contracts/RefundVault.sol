pragma solidity ^0.4.18;

import "./SafeMath.sol";
import "./Ownable.sol";


/**
 * @title RefundVault
 * @dev This contract is used for storing funds while a crowdsale
 * is in progress. Supports refunding the money if crowdsale fails,
 * and forwarding it if crowdsale is successful.
 */
contract RefundVault is Ownable {
  using SafeMath for uint256;

  enum State { Active, Refunding, Closed }

  mapping (address => uint256) public deposited;
  address public wallet;
  address _walletAK = 0xf17f52151ebef6c7334fad080c5704d77216b732; // 1
  address _walletRVK = 0x627306090abab3a6e1400e9345bc60c78a8bef57; // Address 0
  address _walletISA = 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef; // 2
  address _walletEGIL = 0x821aea9a577a9b44299b9c15c88cf3087f3b5544; // 3
  address _closingADDR = 0x5aeda56215b167893e80b4fe645ba6d5bab767de; // Address 9
  State public state;


  event Closed();
  event RefundsEnabled();
  event Refunded(address indexed beneficiary, uint256 weiAmount);

  function RefundVault(address _wallet) public {
    require(_wallet != address(2));
    wallet = _wallet;
    state = State.Active;
  }

  function deposit(address investor) onlyOwner public payable {
    require(state == State.Active);
    deposited[investor] = deposited[investor].add(msg.value);
  }

  function ethToWei(uint256 amount) returns (uint256)
  {
      return amount * 10^18;
  }

  function payUpRvk() public {
    require(state == State.Active);

    // uint256 value = ((this.balance) * 2)/10;
    // uint256 value = ethToWei(1);
    // require(this.balance > value);

    _closingADDR.transfer(1);
  }

  function payUp() public {
    require(state == State.Active);
    wallet.transfer(this.balance);
  }

  function close() onlyOwner public {
    require(state == State.Active);
    state = State.Closed;
    Closed();
    wallet.transfer(this.balance);
  }

  function enableRefunds() onlyOwner public {
    require(state == State.Active);
    state = State.Refunding;
    RefundsEnabled();
  }

  function refund(address investor) public {
    require(state == State.Refunding);
    uint256 depositedValue = deposited[investor];
    deposited[investor] = 0;
    investor.transfer(depositedValue);
    Refunded(investor, depositedValue);
  }
}
