pragma solidity ^0.4.2;

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract SplitCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	/*address addr_one;
	address addr_two;

	function MetaCoin() {
		balances[tx.origin] = 10000;
	}*/

	function splitCoin(address addr_one, address addr_two, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		uint half_amount;
		half_amount = amount/2;
		
		balances[addr_one] += half_amount;
		balances[addr_two] += half_amount;
		Transfer(msg.sender, addr_one, half_amount);
		Transfer(msg.sender, addr_two, half_amount);
		return true;
	}
	
	function addCoin(address lucky_guy, uint amount) returns (bool sufficient){
	    balances[lucky_guy] += amount;
	    return true;
	}

	function getBalance(address addr) returns(uint) {
		return balances[addr];
	}
}
