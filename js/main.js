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
  
  $(document).ready(function () {
  $(".refresh_button_custom").on("click", function () {
    const refreshIcon = $(this).find(".refresh_icon_custom");
    refreshIcon.addClass("animate-pulse");

    setTimeout(() => {
      refreshIcon.removeClass("animate-pulse");
    }, 1000);
  });
});

 
// Add click event listener to .search_currency
$('.search_currency_send .text-block-15').on('input', function() {
  const searchText = $(this).text().toLowerCase();

  $('.send_coin_expand .coin_name_send').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return coinName.includes(searchText);
  }).closest('.coin_placeholder').show();

  $('.send_coin_expand .coin_name_send').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return !coinName.includes(searchText);
  }).closest('.coin_placeholder').hide();
});
 
// Add click event listener to .search_currency
$('.search_currency_receive .text-block-15').on('input', function() {
  const searchText = $(this).text().toLowerCase();

  $('.receive_coin_expand .coin_name_receive').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return coinName.includes(searchText);
  }).closest('.coin_placeholder_receive').show();

  $('.receive_coin_expand .coin_name_receive').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return !coinName.includes(searchText);
  }).closest('.coin_placeholder_receive').hide();
});

// Add click event listener to .search_currency
$('.search_currency_send_mobile .text-block-15').on('input', function() {
  const searchText = $(this).text().toLowerCase();

  $('.send_coin_expand_mobile .coin_name_send_mobile').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return coinName.includes(searchText);
  }).closest('.coin_placeholder_mobile').show();

  $('.send_coin_expand_mobile .coin_name_send_mobile').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return !coinName.includes(searchText);
  }).closest('.coin_placeholder_mobile').hide();
});
 
// Add click event listener to .search_currency
$('.search_currency_receive_mobile .text-block-15').on('input', function() {
  const searchText = $(this).text().toLowerCase();

  $('.receive_coin_expand_mobile .coin_name_receive_mobile').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return coinName.includes(searchText);
  }).closest('.coin_placeholder_receive_mobile').show();

  $('.receive_coin_expand_mobile .coin_name_receive_mobile').filter(function() {
    const coinName = $(this).text().toLowerCase();
    return !coinName.includes(searchText);
  }).closest('.coin_placeholder_receive_mobile').hide();
});



  // Add click event listener to .coin_placeholder
  $(".coin_placeholder").on("click", function() {
	$("div.placeholder_send").replaceWith($("div.coin_name_send").clone());
	$("div.coin_first").replaceWith($("div.coin").clone());
	$(".send_coin_expand").removeClass("show");
  });
  
  
  // Add click event listener to .coin_placeholder
  $(".coin_placeholder_receive").on("click", function() {
	$("div.placeholder_receive").replaceWith($("div.coin_name_receive").clone());
	$("div.coin_first_receive").replaceWith($("div.coin_receive").clone());
	$(".receive_coin_expand").removeClass("show");
  });
  
  // Add click event listener to .coin_placeholder
  $(".coin_placeholder_mobile").on("click", function() {
	$("div.placeholder_send_mobile").replaceWith($("div.coin_name_send_mobile").clone());
	$("div.coin_first_mobile").replaceWith($("div.coin_mobile").clone());
	$(".send_coin_expand_mobile").removeClass("show");
  });
  
  // Add click event listener to .coin_placeholder
  $(".coin_placeholder_receive_mobile").on("click", function() {
	$("div.placeholder_receive_mobile").replaceWith($("div.coin_name_receive_mobile").clone());
	$("div.coin_first_receive_mobile").replaceWith($("div.coin_receive_mobile").clone());
	$(".receive_coin_expand_mobile").removeClass("show");
  });

  // Add click event listener to the arrow elements
  $(".swap_right .coin_selector_arrow, .swap_receive_right .coin_selector_arrow, .swap_right .coin_selector_arrow_mobile, .swap_receive_right .coin_selector_arrow_mobile").on("click", handleArrowClick);
});
