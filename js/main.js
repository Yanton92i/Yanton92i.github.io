function toggleExpand(element, className) {
  element.classList.toggle(className);
}

document.addEventListener('DOMContentLoaded', function () {
  // Send Coin
  const sendArrow = document.querySelector('.swap_right .coin_selector_arrow');
  const sendArrowMobile = document.querySelector('.swap_right .coin_selector_arrow_mobile');
  const sendExpand = document.querySelector('.send_coin_expand');
  const sendExpandMobile = document.querySelector('.send_coin_expand_mobile');

  // Receive Coin
  const receiveArrow = document.querySelector('.swap_receive_right .coin_selector_arrow');
  const receiveArrowMobile = document.querySelector('.swap_receive_right .coin_selector_arrow_mobile');
  const receiveExpand = document.querySelector('.receive_coin_expand');
  const receiveExpandMobile = document.querySelector('.receive_coin_expand_mobile');

  // Event listeners for desktop
  sendArrow.addEventListener('click', () => toggleExpand(sendExpand, 'show'));
  receiveArrow.addEventListener('click', () => toggleExpand(receiveExpand, 'show'));

  // Event listeners for mobile
  sendArrowMobile.addEventListener('click', () => toggleExpand(sendExpandMobile, 'show'));
  receiveArrowMobile.addEventListener('click', () => toggleExpand(receiveExpandMobile, 'show'));
});
