let web3;
let provider;

async function initialize() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  } else {
    const rpcUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';
    web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));
  }

  provider = new WalletConnectProvider({
    infuraId: 'YOUR_INFURA_PROJECT_ID',
  });
}

initialize();

let connectedAccount;

async function connectWallet() {
  try {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      connectedAccount = web3.eth.accounts[0];
      enableInteractButton();
    } else {
      await provider.enable();
      web3 = new Web3(provider);
      connectedAccount = (await web3.eth.getAccounts())[0];
      enableInteractButton();
    }
  } catch (err) {
    console.error('Error connecting wallet:', err);
  }
}

document.querySelector('.connect').addEventListener('click', connectWallet);

const SHIN_TOKEN_ADDRESS = '0x323efd000a71F2567534e66eC6ae1b2b789a623a';
const MINIMUM_SHIN_TOKENS = 5000;

async function checkTokenBalance(account) {
  const contractABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_kingOfShinar","type":"address"},{"indexed":false,"internalType":"uint256","name":"_randomPercent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensAdded","type":"uint256"}],"name":"kingOfShinarRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_oldKing","type":"address"},{"indexed":false,"internalType":"address","name":"_newKing","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"newKingOfShinar","type":"event"},{"inputs":[],"name":"addLPAndAllowExchange","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"autoBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getstETHInReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kingOfShinar","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kingOfShinarAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPumpStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRebaseStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextLPPumpTimeLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextRebaseTimeLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"redeemForETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensLeftForSwapback","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensToRedeemFor1ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Add your token's ABI here
  const tokenContract = new web3.eth.Contract(contractABI, SHIN_TOKEN_ADDRESS);

  const balance = await tokenContract.methods.balanceOf(account).call();
  const hasEnoughTokens = web3.utils.fromWei(balance, 'ether') >= MINIMUM_SHIN_TOKENS;

  return hasEnoughTokens;
}

const interactButton = document.querySelector('.interact');

async function enableInteractButton() {
  if (!connectedAccount) {
    interactButton.disabled = true;
    return;
  }

  const hasEnoughTokens = await checkTokenBalance(connectedAccount);

  if (hasEnoughTokens) {
    interactButton.disabled = false;
  } else {
    interactButton.disabled = true;
  }
}

interactButton.addEventListener('click', handleInteractButtonClick);

const COUNTDOWN_SECONDS = 24 * 60 * 60;

let countdownTimeout;
let countdownEnd;

function startCountdown() {
  const currentTime = Math.floor(Date.now() / 1000);
  countdownEnd = currentTime + COUNTDOWN_SECONDS;
  localStorage.setItem('countdownEnd', countdownEnd);
  updateCountdown();

  interactButton.disabled = true;
}

function updateCountdown() {
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingSeconds = countdownEnd - currentTime;

  if (remainingSeconds <= 0) {
    clearTimeout(countdownTimeout);
    enableInteractButton();
  } else {
    interactButton.textContent = `Interact (${Math.floor(remainingSeconds / 3600)}:${Math.floor((remainingSeconds % 3600) / 60)}:${remainingSeconds % 60})`;
    countdownTimeout = setTimeout(updateCountdown, 1000);
  }
}

function handleInteractButtonClick() {
  startCountdown();
}

initializeCountdown();

function initializeCountdown() {
  countdownEnd = parseInt(localStorage.getItem('countdownEnd'), 10);

  if (countdownEnd) {
    updateCountdown();
  } else {
    enableInteractButton();
  }
}
