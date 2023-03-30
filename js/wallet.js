import Web3Modal from 'web3modal';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

export const providerOptions = {};
export const web3Modal = new Web3Modal({
  network: "arbitrum",
  cacheProvider: true,
  providerOptions: providerOptions,
});

export let web3;
export let userAccount;

export const ERC20_ABI = [
  // ... The ERC20 ABI contents ...
];

export const tokenAddress = '0xYourTokenAddressHere';
export const minimumTokens = 100;

export const checkMinimumBalance = async () => {
  const tokenContract = new web3.eth.Contract(ERC20_ABI, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(userAccount).call();
  return parseFloat(web3.utils.fromWei(balance)) >= minimumTokens;
};

export const connectWallet = async () => {
  const provider = await web3Modal.connect();
  web3 = new window.Web3(provider);
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
    } else {
      // Disable "MAKE HIM HIGH" button and show a message
      document.getElementById("makeHimHigh").setAttribute("disabled", true);
    }
  } catch (error) {
    console.error("Failed to connect wallet:", error);
  }
};
