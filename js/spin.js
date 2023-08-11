const spinButton = document.querySelector('.loot_button');
let hasSpun = false; // You will need to replace this with a logic that checks if the user's wallet has already spun

spinButton.addEventListener('click', function() {
  if (hasSpun) return;

  let randomValue = Math.random() * 100;
  let result;

  if (randomValue < 0.1) {
    result = "popup_win_prize_1";
  } else if (randomValue < 0.3) {
    result = "popup_win_prize_2";
  } else if (randomValue < 0.8) {
    result = "popup_win_prize_3";
  } else if (randomValue < 50.5) {
    result = "popup_win_wl";
  } else {
    spinButton.textContent = "Nothing Found";
  }

  if (result) {
    document.querySelector(`.${result}`).style.display = 'flex';
  }

  hasSpun = true; // You should replace this with logic that records that the user's wallet has spun
  spinButton.style.pointerEvents = 'none';
  spinButton.style.cursor = 'not-allowed';
});
