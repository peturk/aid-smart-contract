App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load disaster areas.
    $.getJSON('../disaster_areas.json', function(data) {
      var rescueTeamRow = $('#rescueTeamRow');
      var rescueTeamTemplate = $('#rescueTeamTemplate');

      $.each(data, function(i, rescueTeam) {
        web3.eth.getBalance(rescueTeam.address, function (error, result) {
          var balance = -1
          if (!error) {
            balance = result / 1000000000000000000;
          };
          rescueTeamTemplate.find('.panel-title').text(rescueTeam.name);
          rescueTeamTemplate.find('img').attr('src',rescueTeam.picture);
          rescueTeamTemplate.find('.rescue-team-population').text(rescueTeam.population);
          rescueTeamTemplate.find('.rescue-team-location').text(rescueTeam.location);
          rescueTeamTemplate.find('.rescue-team-balance').text(balance);
          rescueTeamTemplate.find('.btn-donate').attr('data-id', data[i].id);
          rescueTeamRow.append(rescueTeamTemplate.html());
        });
      });
    });

    return App.initWeb3();
  },

  getBalances: function(data) {
    var promises = [];
    $.each(data, function(e, value) {
      var dfd = $.Deferred();
      web3.eth.getBalance(value.address, function (error, result) {
        if (!error) {
          console.log(e + ': ' + result);
          promises.push(result)
          dfd.resolve(result)
        };
      });
    });
    return $.when.apply(undefined, promises).promise();
  },

  initWeb3: function() {
    // Is there an injected web3 instance
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      console.log('web3 currentProvider')
    } else {
      // If no injected web3 isntance is detected, fail back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      console.log('no injected web3')
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Donation.json', function(data) {
      // Get the necessary contract artifact file and instatiate it with truffle-contract
      var AdoptionArtifact = data;
      App.contracts.Donation = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Donation.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-donate', App.handleDonation);
  },



   handleDonation: function(event) {
    event.preventDefault();
    var receiverId = parseInt($(event.target).data('id'));

    var donationInstance;

    $.getJSON('../disaster_areas.json', function(data) {
      var receiverAddress = "0x000";
      $.each(data, function(i, rescueTeam) {
        if (rescueTeam.id === receiverId) {
          receiverAddress = rescueTeam.address;
        }
      });
      web3.eth.getAccounts(function(error, accounts) {
          if (error) {
            console.log(error);
          }

          var account = accounts[0];

          App.contracts.Donation.deployed().then(function(instance) {
            donationInstance = instance;
            var amount = 10;
            // Execute donation as a transaction by sending account
            return donationInstance.transfer(receiverAddress, amount, {from: account})
          }).then(function(result) {
             console.log('Done!!');
          }).catch(function(err) {
            console.log(err.message);
          });
        });
    });

    
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
