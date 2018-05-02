# aid-smart-contract

# Run

In terminal:

- truffle develop
- compile
- migrate --reset

In a new terminal window:

- node server.js

Once the server is running, open localhost:8081 and log into Metamask

# Tutorials

Farið var eftir tveimur tutorial-um:

- https://medium.com/@vovakuzmenkov/full-stack-crowdfunding-smart-contract-development-15ed139cde06
- https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6

Það þarf að ná í open-zeppeline og setja zeppelin-solidity möppuna á réttan stað

# Truffle

Install truffle: http://truffleframework.com/
- For Linux and Apple:
While in aid-smart-contract folder run: truffle develop
- For Windows:
While in aid-smart-contract folder run: truffle.cmd develop

“New RPC URL” enter http://localhost:9545/
Complile the contract by running: compile
Deploy the contract onto the blockchain: migrate --reset

# MetaMask

Install MetaMask: https://metamask.io/
Importing Existing DEN:
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat

# Server

Install npm: https://nodejs.org/en/
Install node_modules: npm install
Run server: npm run dev

# First Time Run

- The first time the contract is run, there are three lines that need to be commented in app.js inside 'SampleCrowdsaleToken.json' ajax call in order to deploy the token
- It is not necessary to run it again

- These line can also be run in the terminal:

-- coin = SampleCrowdsaleToken.at(tokenAddress)

-- coin.transferOwnership(crowdsale.address)

-- coin.balanceOf(purchaser).then(balance => balance.toString(10))

-- SampleCrowdsale.deployed().then(inst => inst.sendTransaction({ from: purchaser, to:

- Here is an example how a purchase of a coin can be made through terminal

> purchaser = web3.eth.accounts[2]

> SampleCrowdsale.deployed().then(inst => { crowdsale = inst })

> crowdsale.token().then(addr => { tokenAddress = addr } )

> tokenAddress

> coin = SampleCrowdsaleToken.at(tokenAddress)

> coin.transferOwnership(crowdsale.address)

> coin.balanceOf(purchaser).then(balance => balance.toString(10))

> SampleCrowdsale.deployed().then(inst => inst.sendTransaction({ from: purchaser, to: crowdsale.address, value: web3.toWei(5, "ether")}))
 
> coin.balanceOf(purchaser).then(balance => purchaserGusTokenBalance = balance.toString(10))

> web3.fromWei(purchaserGusTokenBalance, "ether")

