const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function deployContract() {
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK);
  // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const encryptedJson = fs.readFileSync("./.ecrytedKeyFile.json", "utf8");
  let wallet = await ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  );

  wallet = wallet.connect(provider);

  // Read bytecode and ABI from files
  const bytecode = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.json", "utf8");

  // Deploy the contract
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy({ gasLimit: 6721975 }); // Specify gas limit
  // console.log("Contract deployed:", contract);

  // Wait for the transaction to be mined
  // await contract.deployed();

  // Output contract address
  console.log("Deploying the contract");
  await contract.deploymentTransaction().wait(1);
  // console.log("transaction Deployment : ", contract.deploymentTransaction());
  // console.log("transaction receipt : ", transactionReceipt);

  const currentFavNum = await contract.retrieve();
  console.log(`favNum : ${currentFavNum}`);

  const transactionResOfStore = await contract.store("3");
  const callingStoreAfter1Block = await transactionResOfStore.wait(1);

  const updatedFavNum = await contract.retrieve();
  console.log(`updateFavNum: ${updatedFavNum}`);

  const transactionResOfAddPerson = await contract.addPerson(
    "Dev Aggarwal",
    "03"
  );
  const callingAddPersonAfter1Block = await transactionResOfAddPerson.wait(1);

  const atIndex0 = await contract.peoplesList(0);
  console.log(atIndex0);

  const strToNum = await contract.strToNum("Dev Aggarwal");
  console.log(strToNum.toString());
}

deployContract().catch(console.error);
