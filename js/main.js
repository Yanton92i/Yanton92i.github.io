window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    const connectButton = document.querySelector('.connect');
    const guessButton = document.querySelector('.send_button');
    const buyPsykoDiv = document.querySelector('.buy_psyko');
    const closeButton = document.querySelector('.close_button');

    // Make guess button unclickable at the start
    guessButton.style.pointerEvents = 'none';
    guessButton.style.cursor = 'not-allowed';

    connectButton.addEventListener('click', async () => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

        connectButton.textContent = account.slice(0, 2) + '...' + account.slice(-3);

        if (parseFloat(balanceEth) >= 0.0010) {
            guessButton.style.pointerEvents = 'auto';
            guessButton.style.cursor = 'pointer';
        } else {
            guessButton.style.pointerEvents = 'none';
            guessButton.style.cursor = 'not-allowed';
            buyPsykoDiv.style.display = 'flex';
        }
    });
});
