pragma solidity ^0.4.18;

import "./SafeMath.sol";
import "./Ownable.sol";

contract Vault is Ownable {
	using SafeMath for uint256;

	enum State { Active, Closed }

	address public wallet;
	State public state;

	event Closed();
	event PayUp(address indexed _rescueAddr, uint256 weiAmount);


	function Vault(address _wallet) public {
		require(_wallet != address(0)); //TODO: Why?
		wallet = _wallet; // Collection wallet after closing
		state = State.Active;
	}

	function close() onlyOwner public {
		require(state == State.Active);
		state = State.Closed;
		Closed();
		wallet.transfer(this.balance);
	}

	function payOut(address _rescueAddr, uint256 weiAmount) onlyOwner public {
		require(state == State.Active);
		require(this.balance >= weiAmount);
		_rescueAddr.transfer(weiAmount);
		PayUp(_rescueAddr, weiAmount);
	}
}