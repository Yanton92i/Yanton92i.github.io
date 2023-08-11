async function connectWallet() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkBalance();
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

async function checkBalance() {
  const accounts = await window.web3.eth.getAccounts();
  const balanceWei = await window.web3.eth.getBalance(accounts[0]);
  const balanceEth = window.web3.utils.fromWei(balanceWei, 'ether');
  const spinButton = document.getElementById('spin-button');

  if (parseFloat(balanceEth) >= 0.001) {
    spinButton.classList.remove('disabled-button');
  } else {
    spinButton.classList.add('disabled-button');
  }
}

document.querySelector('.button_wallet').addEventListener('click', connectWallet);
