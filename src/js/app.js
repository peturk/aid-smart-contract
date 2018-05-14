App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      //App.web3Provider = new Web3.providers.HttpProvider('https://ropsten.infura.io/cpokRXa96X1xQ48pv841');
      web3 = new Web3(App.web3Provider);
    }

    // App.simulation()

    return App.initContract();
  },

  // simulation: function() {
  //   // 
  // }

  initContract: function() {
    $.ajax({
        url: 'SampleCrowdsale.json',
        async: false,
        dataType: 'json',
        success:function(data){
                // Get the necessary contract artifact file and instantiate it with truffle-contract.
          var SampleCrowdsaleArtifact = data;
          App.contracts.SampleCrowdsale = TruffleContract(SampleCrowdsaleArtifact);

          // Set the provider for our contract.
          App.contracts.SampleCrowdsale.setProvider(App.web3Provider);
          return App.getRaisedFunds(), App.getGoalFunds(), App.getEndTime(), App.isFinalized(), App.getTokenPrice1(), App.getTokenPrice10(), App.getTokenPrice100(), App.isGoalReached(), App.getEthRefundValue();
        }
    });

        $.ajax({
        url: 'SampleCrowdsaleToken.json',
        async: false,
        dataType: 'json',
        success:function(data){
                // Get the necessary contract artifact file and instantiate it with truffle-contract.
          var SampleCrowdsaleTokenArtifact = data;
          App.contracts.SampleCrowdsaleToken = TruffleContract(SampleCrowdsaleTokenArtifact);

          // Set the provider for our contract.
          App.contracts.SampleCrowdsaleToken.setProvider(App.web3Provider);

          return App.getBalance(), App.getTokenContractAddress();
        }
    });

    $.getJSON('RefundVault.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var RefundVaultArtifact = data;
      App.contracts.RefundVault = TruffleContract(RefundVaultArtifact);

      // Set the provider for our contract.
      App.contracts.RefundVault.setProvider(App.web3Provider);
    });

    $.getJSON('MintableToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MintableTokenArtifact = data;
      App.contracts.MintableToken = TruffleContract(MintableTokenArtifact);

      // Set the provider for our contract.
      App.contracts.MintableToken.setProvider(App.web3Provider);

      // Use subcontract token to return current token balance of the user.
      return App.getBalance(), App.getTokenContractAddress();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#simulate', App.simulate);
    $(document).on('click', '#buy1Tokens', App.handleBuy1Tokens);
    $(document).on('click', '#buy10Tokens', App.handleBuy10Tokens);
    $(document).on('click', '#buy100Tokens', App.handleBuy100Tokens);
    $(document).on('click', '#finalizeButton', App.handleFinalize);
    $(document).on('click', '#claimRefund', App.handleClaimRefund);

    $(document).on('submit', '#TheForm', App.submitTheForm);
  },

  submitTheForm: function(e) {
    e.preventDefault()
    if (!window.disasterData) {
      alert('NO DATA')
      return false
    }

    const vindhradi = parseInt(e.target.vindhradi.value)

    let newObject = window.disasterData
    newObject[0].vindhradi = vindhradi

    console.log(newObject)

    var postData = {
      JSON_stringified: JSON.stringify(newObject)
    }

    $.post('/process_post', postData, (data, status) => {
      //console.log('cool', data, status)

      if (status !== 'success') {
        alert('VILLA !!!!')
      } else {
        console.log('SUCCESS')
        const parsedData = JSON.parse(data)
        console.log(parsedData)
        if (parsedData.message) {
          alert(parsedData.message)
        }
      }
    })

    return false
  },

  // TODO: Make Success links open in a new window
  simulate: function() {
    $.getJSON( "/disaster_areas.json", function( data ) {
      window.disasterData = data

      /*
      console.log(data)
      var items = [];
      $.each( data, function( key, name ) {
        items.push( "<li id='" + key + "'>" + name.id + " " + name.name +"</li>" );
      });

      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "body" );
      */
    });
  },

  // TODO: Make Success links open in a new window
  handleBuy1Tokens: function send() {
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      var crowdsaleContractAddress = crowdsale.address;
      crowdsale.rate().then(function(rate){
        var rate = rate;
        web3.eth.sendTransaction({
          from: web3.eth.coinbase,
          to: crowdsaleContractAddress,
          value: web3.toWei(rate, 'ether')

        },function(error, result) {
          if (!error) {
            document.getElementById('response1').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
          } else {
            document.getElementById('response1').innerHTML = '<pre>' + error + '</pre>'
          }
          })
      })
    })
  },

  //TODO: Make Success links open in a new window
  handleBuy10Tokens: function send() {
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      var crowdsaleContractAddress = crowdsale.address;
      crowdsale.rate().then(function(rate){
        var rate = rate*10;

        web3.eth.sendTransaction({
          from: web3.eth.coinbase,
          to: crowdsaleContractAddress,
          value: web3.toWei(rate, 'ether')

        },function(error, result) {
          if (!error) {
            document.getElementById('response10').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
          } else {
            document.getElementById('response10').innerHTML = '<pre>' + error + '</pre>'
          }
          })
      })
    })
  },

  //TODO: Make Success links open in a new window
  handleBuy100Tokens: function send() {
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      var crowdsaleContractAddress = crowdsale.address;
      crowdsale.rate().then(function(rate){
        var rate = rate*100;

        web3.eth.sendTransaction({
          from: web3.eth.coinbase,
          to: crowdsaleContractAddress,
          value: web3.toWei(rate, 'ether')

        },function(error, result) {
          if (!error) {
            document.getElementById('response100').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
          } else {
            document.getElementById('response100').innerHTML = '<pre>' + error + '</pre>'
          }
          })
      })
    })
  },

  getBalance: function() {
    console.log('Getting balances...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      return crowdsale.token();
      }).then(function(address){
        var token_contract_address = address;
        console.log('Token contract address: ' + token_contract_address);
        token_contract = App.contracts.MintableToken.at(token_contract_address);
        return token_contract.balanceOf(web3.eth.coinbase);
      }).then(function(balance) {
        tokenBalance = Math.round(10*balance/1000000000000000000)/10; // Balance is returned in wei (10^18 per 1 ETH), so divide by 10^18. Also using a technique to "multiply and divide" by 10 for rounding up to 1 decimal.
        $('#tokenBalance').text(tokenBalance.toString(10));
      }).catch(function(err) {
        console.log(err.message);
      });
  },

  getRaisedFunds: function(){
    console.log('Getting raised funds...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.weiRaised();
    }).then(function(result){
      EthRaised = Math.round(1000*result/1000000000000000000)/1000; // Result is returned in wei (10^18 per 1 ETH), so divide by 10^18. Also using a technique to "multiply and divide" by 1000 for rounding up to 3 decimals.
      $('#ETHRaised').text(EthRaised.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getGoalFunds: function(){
    console.log('Getting goal funds...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.goal();
    }).then(function(result){
      EthGoal = Math.round(1000*result/1000000000000000000)/1000; // Result is returned in wei (10^18 per 1 ETH), so divide by 10^18. Also using a technique to "multiply and divide" by 1000 for rounding up to 3 decimals.
      $('#ETHGoal').text(EthGoal.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getTokenPrice1: function(){
    console.log('Getting 1 token price in ETH...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.rate();
    }).then(function(result){
      // tokenPrice1 = Math.round(1000*1/result)/1000;
      // tokenPrice1 = Math.round(1000*1/result)/1000;
      tokenPrice1 = Math.round(result);
      $('#1TokenPrice').text(tokenPrice1.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getTokenPrice10: function(){
    console.log('Getting 10 token price in ETH...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.rate();
    }).then(function(result){
      tokenPrice10 = Math.round(10*result);
      $('#10TokenPrice').text(tokenPrice10.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getTokenPrice100: function(){
    console.log('Getting 100 token price in ETH...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.rate();
    }).then(function(result){
      tokenPrice100 = Math.round(100*result);
      $('#100TokenPrice').text(tokenPrice100.toString(10));
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  getEndTime: function(){
    console.log('Getting endtime...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.endTime();
    }).then(function(result){
      endTime = new Date(result.c[0]*1000);
      console.log(endTime);
      $('#EndTime').text(endTime);
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  //TODO: rewrite to show token contract address rather than crowdsale
  getTokenContractAddress: function(){
    console.log('Getting token contract address...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      crowdsaleAddress = crowdsale.address
      console.log('SampleCrowdsale Address: ' + crowdsaleAddress);
      return crowdsale.token()
    }).then(function(token_address){
      tokenContractAddress = token_address;
      console.log('Token Crowdsale Address: ' + tokenContractAddress);
      $('#TokenContractAddress').text(tokenContractAddress);
      })
  },

  handleFinalize: function(event) {
    event.preventDefault();
    console.log('Finalizing Campaign...');
    var crowdsale;
      App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        crowdsale.finalize();
      });
  },

  isFinalized: function(){
    console.log('Check Campaign Finalization status...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.isFinalized();
    }).then(function(result){
      $('#isFinalized').text(result);
      }).catch(function(err) {
          console.log(err.message);
        });
  },

  isGoalReached: function(){
    console.log('Check Campaign Goal Reached status...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
        crowdsale = instance;
        return crowdsale.goalReached();
    }).then(function(result){
      $('#isGoalReached').text(result);
      }).catch(function(err) {
          console.log(err.message);
        });

  },

  // TODO: add success message for a user
  handleClaimRefund: function(event) {
    event.preventDefault();
    console.log('Claiming Refund via vault.refund(investor)...');
    App.contracts.SampleCrowdsale.deployed().then(function(instance) {
      crowdsale = instance;
      crowdsale.vault().then(function(vault_address){
        var vault = App.contracts.RefundVault.at(vault_address)
        vault.refund(web3.eth.coinbase).catch(function(error, result) {
        if (!error) {
          document.getElementById('claimRefund_response').innerHTML = 'Success: <a href="https://ropsten.etherscan.io/tx/' + result + '"> View Transaction </a>'
        } else {
          document.getElementById('claimRefund_response').innerHTML = '<pre>' + error + '</pre>'
        }
      });
      })
    })
  },

  getEthRefundValue: function() {
    console.log('Getting Eth Refund value...');
    App.contracts.SampleCrowdsale.deployed()
    .then(function(instance) {
      var crowdsale = instance;
      return crowdsale.vault()
      }).then(function(vaultaddr){
        var vaultaddr = vaultaddr;
        var vault = App.contracts.RefundVault.at(vaultaddr)
        return vault.deposited(web3.eth.coinbase)
        }).then(function(balance) {
          ethRefundValue = Math.round(1000*balance/1000000000000000000)/1000;
          $('#ethRefundValue').text(ethRefundValue.toString(10));
          }).catch(function(err) {
            console.log(err.message);
            });
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});