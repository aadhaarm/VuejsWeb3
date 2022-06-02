// Compiles a smart contract and then deploys to Blockchain - ganache.
const fs = require("fs");
const solc = require("solc");
let Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let file = fs.readFileSync("initial.sol").toString();
console.log(file);

var input = {
    language: "Solidity",
    sources: {
        "initial.sol": {
            content: file,
        },
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["*"]
            }
        }
    }
}

// STEP 1 - Compile the smartcontract.
var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Result", output);

ABI = output.contracts['initial.sol']['initial'].abi;
console.log("ABI", ABI);

// Write ABI to json file.
fs.writeFile('./InitialABI.json', JSON.stringify(ABI), err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});

bytecode = output.contracts['initial.sol']['initial'].evm.bytecode.object;
console.log("Bytecode", bytecode);

contract = new web3.eth.Contract(ABI);
web3
    .eth
    .getAccounts()
    .then((acc) => {
        // console.log("Accounts", acc);
        mainAccount = acc[0];

        // address that will deploy smart contract
        console.log("Default Account:", mainAccount);

        // STEP 2 - Deploy the contract to blockchain.
        contract
            .deploy({ data: bytecode })
            .send({ from: mainAccount, gas: 470000 })
            .on("receipt", (receipt) => {

                // Contract Address will be returned here
                console.log("Contract Address:", receipt.contractAddress);
            })
            .then((initialContract) => {
                initialContract.methods.message().call((err, data) => {
                    console.log("Initial Data:", data);
                });
            });
    })
