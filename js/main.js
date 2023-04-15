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

  function handleCoinPlaceholderClick(event) {
    const target = $(event.target).closest('.coin_placeholder');
    const isMobile = window.innerWidth <= 991;
    const coinName = target.find(".coin_name").html(); // Get the coin_name content

    const isSend = target.closest(".send_coin_expand, .send_coin_expand_mobile").length > 0;
    let placeholderToUpdate;

    if (isSend) {
      placeholderToUpdate = isMobile ? $(".swap_right .coin_selector_arrow_mobile + .coin_placeholder .placeholder") : $(".swap_right .coin_selector_arrow + .coin_placeholder .placeholder");
    } else {
      placeholderToUpdate = isMobile ? $(".swap_receive_right .coin_selector_arrow_mobile + .coin_placeholder .placeholder") : $(".swap_receive_right .coin_selector_arrow + .coin_placeholder .placeholder");
    }

    placeholderToUpdate.html(coinName); // Replace the entire content

    if (isSend) {
      if (isMobile) {
        sendExpandMobile.removeClass("show");
      } else {
        sendExpandDesktop.removeClass("show");
      }
    } else {
      if (isMobile) {
        receiveExpandMobile.removeClass("show");
      } else {
        receiveExpandDesktop.removeClass("show");
      }
    }
  }

  $(".send_coin_expand .coin_placeholder, .send_coin_expand_mobile .coin_placeholder, .receive_coin_expand .coin_placeholder, .receive_coin_expand_mobile .coin_placeholder").on("click", handleCoinPlaceholderClick);
});
