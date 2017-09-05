pragma solidity ^0.4.2;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract SplitCoin {

	// event Transfer(address indexed _from, address indexed _to, uint256 _value);

	address addr_one;
	address addr_two;

	function SplitCoin(address a1, address a2) {
		addr_one = a1;
		addr_two = a2;
	}

	function () payable {}

	function splitCoin() payable returns(bool sufficient) {
		// uint half_amount = msg.value/2;

		// if (! addr_one.send(half_amount))
		// 	throw;

		// if (! addr_two.send(half_amount))
		// 	throw;

		// Transfer(msg.sender, addr_one, half_amount);
		// Transfer(msg.sender, addr_two, half_amount);
		return true;
	}

	function getAddresses() returns(address, address) {
		return (addr_one, addr_two);
	}
}
