const spinButton = document.querySelector('.loot_button');
let whitelistSpots = 150; // Initial number of whitelist spots
let hasSpun = false; // You will need to replace this with logic that checks if the user's wallet has already spun
let canSpin = false; // New variable to determine if spinning is allowed

function updateCountdown() {
  const today = new Date();
  const eventTime = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 3, 01, 0);
  const currentTime = Date.now();
  const diff = eventTime - currentTime;

  if (diff <= 0) {
    clearInterval(countdownInterval);
    spinButton.textContent = "Spin";
    if (!hasSpun) {
      canSpin = true; // Enable spinning
      spinButton.style.pointerEvents = 'auto';
      spinButton.style.cursor = 'pointer';
    }
    return;
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  spinButton.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Initialize the countdown
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Call once to set the initial value

spinButton.style.pointerEvents = 'none';
spinButton.style.cursor = 'not-allowed';

spinButton.addEventListener('click', function() {
  if (!canSpin || hasSpun) return; // Check if spinning is allowed

  // Adjust the probability for the whitelist spots
  let whitelistProbability = (whitelistSpots / 150) * 49.7;

  let randomValue = Math.random() * 100;
  let result;

  if (randomValue < 0.1) {
    result = "popup_win_prize_1";
  } else if (randomValue < 0.3) {
    result = "popup_win_prize_2";
  } else if (randomValue < 0.8) {
    result = "popup_win_prize_3";
  } else if (randomValue < whitelistProbability + 0.8) { // Adding the chances from the previous conditions
    result = "popup_win_wl";
    whitelistSpots--; // Decrement the whitelist spots
    document.querySelector('.spots').textContent = whitelistSpots; // Update the displayed number of spots
  } else {
    spinButton.textContent = "Nothing Found";
    return; // If "Nothing Found," exit the function early, keeping the spin button active
  }

  if (result) {
    document.querySelector(`.${result}`).style.display = 'flex';
  }

  hasSpun = true; // You should replace this with logic that records that the user's wallet has spun
  spinButton.textContent = "No More Try"; // Change the button text
  spinButton.style.pointerEvents = 'none';
  spinButton.style.cursor = 'not-allowed';
});
