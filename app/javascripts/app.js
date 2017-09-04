// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import { default as HookedWeb3Provider } from "hooked-web3-provider";
import { default as EthLightWallet } from "eth-lightwallet";
import { default as Promise} from 'bluebird';

// Import our contract artifacts and turn them into usable abstractions.
import splitcoin_artifacts from '../../build/contracts/SplitCoin.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var SplitCoin = contract(splitcoin_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    SplitCoin.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];
      self.getAcc();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  getAcc: function() {
    var split;
    SplitCoin.deployed().then(function (instance) {
      split = instance;
      return split.getAddresses.call({from: account});
    }).then(function(value) {
      console.log(value);
      console.log(value.valueOf());
    }).catch (function(e){
      console.log(e);
    })
  },


  splitCoin: function() {
    var self = this;

    var amount = parseInt(document.getElementById("amount").value);
    

    this.setStatus("Initiating transaction... (please wait)");

    var split;
    SplitCoin.deployed().then(function(instance) {
      split = instance;
      console.log("will send " + amount);
      return split.splitCoin({from: account, value: web3.toWei(amount), gas: 500000});
    }).then(function(tx) {
      console.log(tx);
      self.setStatus("Transaction complete!");
    }).catch(function(e) {
      console.log(e);
      self.setStatus("Error sending coin; see log.");
    });
  }
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  if (window.location.href.indexOf("client_sig") > -1) {
        console.log("In client_sig mode");
        const hookedProvider = new HookedWeb3Provider({
            // Let's pick the one that came with Truffle
            host: web3.currentProvider.host,
            transaction_signer: { 
                hasAddress: function(address, callback) {
                    console.log(address);
                    callback(undefined, true);
                },
                signTransaction: function(tx_params, callback) {
                    console.log(tx_params);
                    callback(undefined, "0x00");
                }
            }
        });
        web3.setProvider(hookedProvider);
    }

  App.start();
});
