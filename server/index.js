const express = require("express");
const app = express();
const cors = require("cors");
const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");

const {
  walletAddress1,
  walletAddress2,
  walletAddress3,
} = require("./scripts/generate.jsx");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {};
balances[walletAddress1] = 100;
balances[walletAddress2] = 50;
balances[walletAddress3] = 75;

let transactionAlert = false;

function verifyAddress(keyArray, walletAddress) {
  const derivedAddress = `0x${toHex(keccak256(keyArray.slice(1))).slice(-20)}`;
  return derivedAddress === walletAddress ? true : false;
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  const privateKey = privateKeys[address];

  res.send({ balance, privateKey });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, publicKeyString } = req.body;

  const uint8Array = Uint8Array.from([
    ...Object.values(JSON.parse(publicKeyString)),
  ]);
  const isValid = verifyAddress(uint8Array, sender);

  if (isValid) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Insufficient funds!" });
    } else {
      transactionAlert = true;
      balances[sender] -= amount;
      balances[recipient] += amount;

      res.send({ balance: balances[sender], transactionAlert });
      transactionAlert = false;
    }
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
