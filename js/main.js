window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
    } catch (error) {
      console.error("User denied account access...")
    }
  }
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  
const connectButton = document.querySelector('.connect');
const guessButton = document.querySelector('.send_button');

// Make guess button unclickable at the start
guessButton.style.pointerEvents = 'none';

// Wait for user to click the connect button
connectButton.addEventListener('click', async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    // Change the button text to show the wallet address
    connectButton.textContent = account.slice(0, 4) + '...' + account.slice(-4);

    if (balanceEth >= 0.0010) {
      guessButton.style.pointerEvents = 'auto';
    } else {
      guessButton.style.pointerEvents = 'none';
    }
});



  guessButton.style.pointerEvents = 'none';
});
