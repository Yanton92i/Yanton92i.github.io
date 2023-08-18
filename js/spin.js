const spinButton = document.querySelector('.loot_button');
let whitelistSpots = 150;
let hasSpun = false;
let canSpin = false;

const wheelBaseImage = document.querySelector('.wheel_base');

function updateCountdown() {
    const today = new Date();
    const eventTime = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 03, 09, 0);
    const currentTime = Date.now();
    const diff = eventTime - currentTime;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        spinButton.textContent = "Spin";
        if (!hasSpun) {
            canSpin = true;
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

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

spinButton.style.pointerEvents = 'none';
spinButton.style.cursor = 'not-allowed';

spinButton.addEventListener('click', function () {
    if (!canSpin || hasSpun) return;

    let randomValue = Math.random() * 100;
    let result;
    let resultRotation;

    if (randomValue < 0.1) {
        result = "popup_win_prize_1";
        resultRotation = 720;
    } else if (randomValue < 0.3) {
        result = "popup_win_prize_2";
        resultRotation = 720;
    } else if (randomValue < 0.8) {
        result = "popup_win_prize_3";
        resultRotation = 720;
    } else if (randomValue < (whitelistSpots / 150) * 49.7 + 0.8) {
        result = "popup_win_wl";
        whitelistSpots--;
        document.querySelector('.spots').textContent = whitelistSpots;
        resultRotation = 720;
    } else {
        result = "Nothing Found";
        resultRotation = 766;
    }

    wheelBaseImage.style.transition = "transform 2s ease-out"; 
    wheelBaseImage.style.transform = `rotate(${resultRotation}deg)`;

console.log("About to set timeout for popup display");
    setTimeout(() => {
		console.log("Inside setTimeout function");
        if (result !== "Nothing Found") {
            document.querySelector(`.${result}`).style.display = 'flex';
        }
    }, 2300);

    hasSpun = true;
    spinButton.textContent = "No More Try";
    spinButton.style.pointerEvents = 'none';
    spinButton.style.cursor = 'not-allowed';
});
