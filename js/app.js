let web3;
let provider;
let connectedAccount;
let countdown;

const connectButton = document.getElementById("connect");
const interactButton = document.getElementById("interact");

connectButton.addEventListener("click", async () => {
  await connectWallet();
});

interactButton.addEventListener("click", () => {
  if (!interactButton.disabled) {
    startCountdown();
  }
});

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    provider = window.ethereum;

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      connectedAccount = accounts[0];
      enableInteractButton();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.error("No Ethereum-compatible browser extension detected");
  }
}

async function checkTokenBalance(address) {
  const minTokensRequired = 5000;
  // Replace with your token contract address and ABI
  const tokenContractAddress = "0x323efd000a71F2567534e66eC6ae1b2b789a623a";
  const contractABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_kingOfShinar","type":"address"},{"indexed":false,"internalType":"uint256","name":"_randomPercent","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensAdded","type":"uint256"}],"name":"kingOfShinarRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_oldKing","type":"address"},{"indexed":false,"internalType":"address","name":"_newKing","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"newKingOfShinar","type":"event"},{"inputs":[],"name":"addLPAndAllowExchange","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"autoBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getstETHInReserve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"kingOfShinar","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"kingOfShinarAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastPumpStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRebaseStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextLPPumpTimeLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextRebaseTimeLeft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"name":"redeemForETH","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redeemRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startStamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensLeftForSwapback","outputs":[{"internalType":"uint256","name":"amt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensToRedeemFor1ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]; // Add your token's ABI here

  const tokenContract = new web3.eth.Contract(tokenContractABI, tokenContractAddress);
  const balance = await tokenContract.methods.balanceOf(address).call();
  return balance >= minTokensRequired;
}

function enableInteractButton() {
  if (!connectedAccount) {
    interactButton.disabled = true;
    interactButton.classList.add("disabled");
    interactButton.textContent = "Interact";
    return;
  }

  checkTokenBalance(connectedAccount).then((hasEnoughTokens) => {
    if (hasEnoughTokens) {
      interactButton.disabled = false;
      interactButton.classList.remove("disabled");
      interactButton.textContent = "Interact";
    } else {
      interactButton.disabled = true;
      interactButton.classList.add("disabled");
      interactButton.textContent = "Insufficient SHIN Tokens";
    }
  });
}

function startCountdown() {
  if (countdown) {
    clearTimeout(countdown);
  }

  interactButton.textContent = "5:00";
  interactButton.disabled = true;
  interactButton.classList.add("disabled");

  let timeRemaining = 300;

  countdown = setInterval(() => {
    timeRemaining--;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    interactButton.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      enableInteractButton();
    }
  }, 1000);
}
