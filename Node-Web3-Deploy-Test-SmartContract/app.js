const fs = require('fs')
let abi = JSON.parse(fs.readFileSync('./InitialABI.json', 'utf-8'));

let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

const contractAddress = "0x43263b6195c9724a29eA78b08fA31a8E78aeb92c";
let contract = new web3.eth.Contract(abi, contractAddress);

// read a value from smart contract
contract.methods.message().call().then(console.log);

// Make a change to smart contract
// contract.methods.setMessage("This is new message").send({ from: "0xAa08827e569a7A869DAD99C790235D5e69746690" });


// Get wallet balance
web3
    .eth
    .getBalance("0xAa08827e569a7A869DAD99C790235D5e69746690")
    .then(
        (val) => {
            console.log(web3.utils.fromWei(val));
        })

