import Web3Modal from "web3modal";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

export const providerOptions = {};
export const web3Modal = new Web3Modal({
  network: "main",
  cacheProvider: false, // Change this line
  providerOptions: providerOptions,
});

export let web3;
export let userAccount;

export const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    type: "function",
  },
];

export const tokenAddress = "0x323efd000a71F2567534e66eC6ae1b2b789a623a";
export const minimumTokens = 5000;

export const checkMinimumBalance = async () => {
  const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(userAccount).call();
  return parseFloat(web3.utils.fromWei(balance)) >= minimumTokens;
};

export const connectWallet = async () => {
  const provider = await web3Modal.connect();
  web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  userAccount = accounts[0];
};

export const connectWalletAndUpdateButton = async () => {
  try {
    await connectWallet();
    const hasMinimumBalance = await checkMinimumBalance();

    if (hasMinimumBalance) {
      // Enable "MAKE HIM HIGH" button
      document.getElementById("makeHimHigh").removeAttribute("disabled");
      document.getElementById("makeHimHigh").classList.remove("disabled");
    } else {
      // Disable "MAKE HIM HIGH" button and show a message
      document.getElementById("makeHimHigh").setAttribute("disabled", true);
      document.getElementById("makeHimHigh").classList.add("disabled");
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error);
  }
};
