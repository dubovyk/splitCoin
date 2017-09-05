pragma solidity ^0.4.2;

import "./SplitCoin.sol";

contract SplitterCreator{
    address[] SplitCoins;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Eventtt();
    

    function () payable  {}
    
    function createSplitter(address addr_one, address addr_two) returns (address){
        address newSplitter = new SplitCoin(addr_one, addr_two);
        SplitCoins.push(newSplitter);
        return newSplitter;
    }
    
    function split(address splitterAddress) payable returns(bool){
        SplitCoin splitter = SplitCoin(splitterAddress);
        if (! splitter.splitCoin.value(msg.value)()) throw;
        Transfer(msg.sender, splitterAddress, msg.value);
        return true;
    }

    function getAddresses() returns (address[]){
        return SplitCoins;
    }

    function getBalance(address addr) returns (uint){
        return addr.balance;
    }
}