import { readFileSync } from "node:fs";
import Arweave from "arweave";
import "dotenv/config.js";
// load Arweave wallet
const wallet = JSON.parse(readFileSync(process.env.WALLET_PATH, "utf-8"));

async function main() {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
  });

  const data = readFileSync("./test/process.wasm"); // 读取文件
  const transaction = await arweave.createTransaction({ data }, wallet);

  transaction.addTag("Name", "sqlite-vec-2.0.1");
  transaction.addTag("AOS-Version", "2.0.1");
  transaction.addTag("Content-Type", "application/wasm");
  transaction.addTag("Data-Protocol", "ao");
  transaction.addTag("Type", "Module");
  transaction.addTag("Variant", "ao.TN.1");
  transaction.addTag(
    "Module-Format",
    "wasm64-unknown-emscripten-draft_2024_02_15"
  );
  transaction.addTag("Input-Encoding", "JSON-1");
  transaction.addTag("Output-Encoding", "JSON-1");
  transaction.addTag("Memory-Limit", "1-gb");
  transaction.addTag("Compute-Limit", "9000000000000");

  // 签署并提交交易
  await arweave.transactions.sign(transaction, wallet);
  const response = await arweave.transactions.post(transaction);

  if (response.status === 200) {
    console.log(`ID: ${transaction.id}`);
  } else {
    console.log(`error: ${response.status}`);
  }
};

main();
