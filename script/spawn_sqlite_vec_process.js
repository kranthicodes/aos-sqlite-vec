import { readFileSync } from "node:fs";
import { createDataItemSigner, spawn } from "@permaweb/aoconnect";
import "dotenv/config.js";
// load Arweave wallet
const wallet = JSON.parse(readFileSync(process.env.WALLET_PATH, "utf-8"));

const MODULE_ID = "aXVDhhKS2rYPG0aB_16j_F8k9Jzj8RGbUaL8CgAKmgE";

async function main() {
  const processId = await spawn({
    // The Arweave TXID of the ao Module
    module: MODULE_ID,
    // The Arweave wallet address of a Scheduler Unit
    scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
    // A signer function containing your wallet
    signer: createDataItemSigner(wallet),
    tags: [
      {
        name: "Authority",
        value: "fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY",
      },
    ],
  });

  console.log(`Process ID: ${processId}`);
}

main();
