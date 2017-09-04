var SplitCoin = artifacts.require("./SplitCoin.sol");

module.exports = function(deployer, network, accounts) {
	deployer.deploy(SplitCoin, accounts[1], accounts[2]);
};
