import { connectWalletAndUpdateButton } from './wallet.js';

const init = () => {
  const connectButton = document.querySelector('.connect_me');
  connectButton.addEventListener('click', async () => {
    await connectWalletAndUpdateButton();
  });
  console.log('Wallet.js is properly linked and initialized.');
};

document.addEventListener('DOMContentLoaded', init);
