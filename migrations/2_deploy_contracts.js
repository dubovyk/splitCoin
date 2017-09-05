// var SplitCoin = artifacts.require("./SplitCoin.sol");
var SplitterCreator = artifacts.require("./SplitterCreator.sol");

module.exports = function(deployer, network, accounts) {
	// deployer.deploy(SplitCoin, accounts[1], accounts[2]);
	deployer.deploy(SplitterCreator);
};
