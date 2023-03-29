document.addEventListener("DOMContentLoaded", () => {
  const connectWalletBtn = document.querySelector(".connect_me");
  const makeHimHighBtn = document.querySelector(".makehimhigh");
  const menuTitle = document.querySelector(".menu_title");
  const highTitle = document.querySelector(".high_title");
  const modal = document.querySelector(".modal");
  const modalBg = document.querySelector(".modal_bg");
  const closeButton = document.querySelector(".close_button");
  const prizeImg = document.querySelector(".prizes_img img");
  const prizeText = document.querySelector(".prize");

  function updateCountdown() {
    const lastClickTime = parseInt(localStorage.getItem("lastClickTime"), 10);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - lastClickTime;
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (elapsedTime < cooldown) {
      makeHimHighBtn.setAttribute("disabled", "");
      const remainingTime = cooldown - elapsedTime;
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      highTitle.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      makeHimHighBtn.removeAttribute("disabled");
      highTitle.textContent = "MAKE HIM HIGH";
    }
  }

  setInterval(updateCountdown, 1000);

  connectWalletBtn.addEventListener("click", () => {
    // Add your wallet connection logic here.
    // Once connected, enable the "Make it High" button.
    updateCountdown();
  });

  makeHimHighBtn.addEventListener("click", () => {
    const randomNumber = Math.floor(Math.random() * 3);
    let imageFile, text;

    switch (randomNumber) {
      case 0:
        imageFile = "images/pic1.png";
        text = "TRY AGAIN NEXT TIME";
        break;
      case 1:
        imageFile = "images/pic2.png";
        text = "GET YOUR REWARD";
        break;
      case 2:
        imageFile = "images/pic3.png";
        text = "GET YOUR PRIZE";
        break;
    }

    prizeImg.src = imageFile;
    prizeImg.srcset = `${imageFile} 500w, ${imageFile} 800w`;
    prizeText.textContent = text;
    modal.classList.add("active");

    const currentTime = new Date().getTime();
    localStorage.setItem("lastClickTime", currentTime);
    updateCountdown();
  });

  modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});
