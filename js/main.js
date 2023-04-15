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

  $(".coin_placeholder").on("click", function () {
    const isMobile = window.innerWidth <= 991;
    const isSend = $(this).closest(".send_coin_expand, .send_coin_expand_mobile").length > 0;
    const coinName = $(this).find(".coin_name").text();

    let targetPlaceholder;

    if (isSend) {
      targetPlaceholder = isMobile ? $(".swap_right .coin_selector_arrow_mobile + .coin_placeholder .placeholder") : $(".swap_right .coin_selector_arrow + .coin_placeholder .placeholder");
    } else {
      targetPlaceholder = isMobile ? $(".swap_receive_right .coin_selector_arrow_mobile + .coin_placeholder .placeholder") : $(".swap_receive_right .coin_selector_arrow + .coin_placeholder .placeholder");
    }

    targetPlaceholder.text(coinName);
  });

  $(".swap_right .coin_selector_arrow, .swap_receive_right .coin_selector_arrow, .swap_right .coin_selector_arrow_mobile, .swap_receive_right .coin_selector_arrow_mobile").on("click", handleArrowClick);
});
