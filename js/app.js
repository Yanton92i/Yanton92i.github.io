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
  const tokenContractAddress = "0xTOKEN_CONTRACT_ADDRESS";
  const tokenContractABI = []; // Token ABI array

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
