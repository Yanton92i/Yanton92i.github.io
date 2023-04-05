import { connectWalletAndUpdateButton } from './wallet.js';

const disableMakeHimHighButton = () => {
  const makeHimHighButton = document.getElementById("makeHimHigh");
  makeHimHighButton.classList.add("disabled");
  console.log('Make Him High button disabled.');
};

const enableMakeHimHighButton = () => {
  const makeHimHighButton = document.getElementById("makeHimHigh");
  makeHimHighButton.classList.remove("disabled");
  console.log('Make Him High button enabled.');
};

const init = () => {
  disableMakeHimHighButton();
  const connectButton = document.querySelector('.connect_me');
  connectButton.addEventListener('click', async () => {
    await connectWalletAndUpdateButton();
  });
  console.log('Wallet.js is properly linked and initialized.');
};

document.addEventListener('DOMContentLoaded', init);
