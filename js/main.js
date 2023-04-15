document.addEventListener('DOMContentLoaded', function () {
  const sendExpand = document.querySelector('.send_coin_expand');
  const receiveExpand = document.querySelector('.receive_coin_expand');

  function toggleExpand(el) {
    el.classList.toggle('show');
  }

  function handleClick(selector, target) {
    document.querySelector(selector).addEventListener('click', function () {
      toggleExpand(target);
    });
  }

  handleClick('.swap_right .coin_selector_arrow', sendExpand);
  handleClick('.swap_receive_right .coin_selector_arrow', receiveExpand);
  handleClick('.swap_right .coin_selector_arrow_mobile', sendExpand);
  handleClick('.swap_receive_right .coin_selector_arrow_mobile', receiveExpand);
});
