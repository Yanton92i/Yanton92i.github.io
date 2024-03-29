window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  const connectButton = document.querySelector('.button_wallet');
  const spinButton = document.querySelector('.loot_button');
  const popupRulesDiv = document.querySelector('.popup_rules'); // Select the popup div

  function disableSpinButton() {
    spinButton.style.pointerEvents = 'none';
    spinButton.style.cursor = 'not-allowed';
  }

  function enableSpinButton() {
    spinButton.style.pointerEvents = 'auto';
    spinButton.style.cursor = 'pointer';
  }

  async function updateUI(account) {
    const balanceWei = await web3.eth.getBalance(account);
    const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

    connectButton.textContent = account.slice(0, 4) + '...' + account.slice(-3);

    if (parseFloat(balanceEth) < 0.0010) {
      disableSpinButton();
      popupRulesDiv.style.display = 'flex'; // Show the popup
    } else {
      enableSpinButton();
      popupRulesDiv.style.display = 'none'; // Hide the popup
    }
  }

  disableSpinButton();
  popupRulesDiv.style.display = 'none'; // Ensure popup is hidden initially

  connectButton.addEventListener('click', async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    updateUI(account);
  });

  // Listen for account changes and update the UI
  window.ethereum.on('accountsChanged', async (accounts) => {
    const account = accounts[0];
    updateUI(account);
  });
  
    document.querySelector('.close_button').addEventListener('click', () => {
    popupRulesDiv.style.display = 'none';
  });
});
