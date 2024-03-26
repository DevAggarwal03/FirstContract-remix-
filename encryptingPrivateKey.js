const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const ecrptedJsonKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD,)
    console.log(ecrptedJsonKey);
    fs.writeFileSync("./.ecrytedKeyFile.json", ecrptedJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
