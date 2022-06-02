<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <h2>Web3 Application</h2>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        <div class="font-weight-medium">
          Balance::<b>{{ balance }}</b> ETH
        </div>
      </v-card>
      <v-card class="logo py-4 d-flex justify-center">
        Blockchain Message :- <b>{{ message }}</b>
      </v-card>
      <v-card>
        <v-layout row wrap>
          <v-flex>
            <v-text-field label="New Message" v-model=newMsg xm="8"></v-text-field>
            <v-btn v-on:click="submitToBlockChain()">Submit to Blockchain</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ABI from '~/assets/InitialABI.json';
import Web3 from 'web3';

export default {
  name: 'IndexPage',
  data() {
    return {
      // To be changed when deploying..
      contractAddress: "0x4397b7A05a02de572acC8BcF428EcEA3671664C1",
      message: "",
      newMsg: "",
      contract: {},
      web3: {},
      // Wallet address, ganache
      walletAddr: "0xAa08827e569a7A869DAD99C790235D5e69746690",
      balance: ""
    }
  },
  mounted() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
    this.contract = new this.web3.eth.Contract(ABI, this.contractAddress);
    this.getMessage();
    this.getBalance();
  },
  methods: {
    getMessage() {
      this.contract
        .methods
        .message()
        .call()
        .then((msg) => {
          this.message = msg;
        }
        );
    },
    submitToBlockChain() {
      this.contract
        .methods
        .setMessage(this.newMsg)
        .send({ from: this.walletAddr })
        .then(() => {
          this.getMessage()
          this.getBalance()
          this.newMsg = "";
        });
    },
    getBalance() {
      this.web3
        .eth
        .getBalance(this.walletAddr)
        .then((val) => {
          this.balance = this.web3.utils.fromWei(val);
        })
    }
  }
}
</script>
