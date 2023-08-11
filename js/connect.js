async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      checkBalance(account);
    } catch (error) {
      console.error("User denied account access");
    }
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
}

async function checkBalance(account) {
  const web3 = new Web3(window.ethereum);
  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

  const spinButton = document.querySelector('.loot_button');

  if (parseFloat(balanceEth) >= 0.001) {
    spinButton.classList.remove('disabled-button');
  } else {
    spinButton.classList.add('disabled-button');
  }
}

document.querySelector('.button_wallet').addEventListener('click', connectWallet);
