const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const SHA256 = require("crypto-js/sha256");

const PRIVATE_KEY1 =
  "5949af2141b0b383514aa16f8ad4047773060720fd48c8a4bdaf0b875caca29b";
const PUBLIC_KEY1 = secp256k1.getPublicKey(PRIVATE_KEY1);
console.log(PUBLIC_KEY1);
const walletAddress1 = `0x${toHex(keccak256(PUBLIC_KEY1.slice(1))).slice(-20)}`;

const PRIVATE_KEY2 =
  "41d91a4ff78cc8fd76b78df3525d2640559f6f021860f2f1a5878826f8c04544";
const PUBLIC_KEY2 = secp256k1.getPublicKey(PRIVATE_KEY2);
const walletAddress2 = `0x${toHex(keccak256(PUBLIC_KEY2.slice(1))).slice(-20)}`;

const PRIVATE_KEY3 =
  "bcd7017a7e77949aebb23ba8930ed7500ac5bf3fb37f516d06dad434fac8c7fc";
const PUBLIC_KEY3 = secp256k1.getPublicKey(PRIVATE_KEY3);
const walletAddress3 = `0x${toHex(keccak256(PUBLIC_KEY3.slice(1))).slice(-20)}`;

const message = "Hello world!";
const messageHash = hashMessage(message);

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes);
  return toHex(hash);
}

module.exports = {
  walletAddress1,
  walletAddress2,
  walletAddress3,
};
// private key:` 5949af2141b0b383514aa16f8ad4047773060720fd48c8a4bdaf0b875caca29b
// public key:` 02c85b099ed2fcc8fce72d3034692991638e4870b0f316d0130465f30229c62dc6

// private key:` 41d91a4ff78cc8fd76b78df3525d2640559f6f021860f2f1a5878826f8c04544
// public key:` 038fcfa44a04fca3a8a8fa79460b67372c30963cef93ee150276c2848581d2b651

// private key:` bcd7017a7e77949aebb23ba8930ed7500ac5bf3fb37f516d06dad434fac8c7fc
// public key:` 0371897bf4578722fecbd24838bb71f9ce899db56b5e53f23efc3935109b33e8e0
