$(document).ready(function () {
  const sendExpandDesktop = $(".send_coin_expand");
  const sendExpandMobile = $(".send_coin_expand_mobile");
  const receiveExpandDesktop = $(".receive_coin_expand");
  const receiveExpandMobile = $(".receive_coin_expand_mobile");

  function handleArrowClick(event) {
    const target = $(event.target);
    const isMobile = window.innerWidth <= 991;
    const isSend = target.closest(".swap_right").length > 0;

    if (isSend) {
      if (isMobile) {
        sendExpandMobile.toggleClass("show");
      } else {
        sendExpandDesktop.toggleClass("show");
      }
    } else {
      if (isMobile) {
        receiveExpandMobile.toggleClass("show");
      } else {
        receiveExpandDesktop.toggleClass("show");
      }
    }
  }

  $(".swap_right .coin_selector_arrow, .swap_receive_right .coin_selector_arrow, .swap_right .coin_selector_arrow_mobile, .swap_receive_right .coin_selector_arrow_mobile").on("click", handleArrowClick);
});
