window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  const connectButton = document.querySelector('.button_wallet');
  const spinButton = document.querySelector('.loot_button');

  // Make spin button unclickable at the start
  spinButton.style.pointerEvents = 'none';
  spinButton.style.cursor = 'not-allowed';

  // Wait for user to click the connect button
  connectButton.addEventListener('click', async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    if (parseFloat(balanceEth) < 0.0010) {
      spinButton.style.pointerEvents = 'none';
      spinButton.style.cursor = 'not-allowed';
    } else {
      spinButton.style.pointerEvents = 'auto';
      spinButton.style.cursor = 'pointer';
    }
  });
});
