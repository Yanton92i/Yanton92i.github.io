var typed = new Typed('#typed-text', {
  strings: [
    'Wake up...<br><br>The Matrix has you...<br><br>Follow the white rabbit.<br><br>You take the blue pill, the story ends... You wake up in your bed and believe whatever you want to believe.<br><br>You take the red pill, you stay in Wonderland, and I show you how deep the rabbit hole goes.'
  ],
  typeSpeed: 20, // typing speed in milliseconds
  showCursor: false, // add this option
  backSpeed: 0, // backspacing speed in milliseconds
  loop: false, // whether to loop the animation or not
  // CSS styles for the text

  onStringTyped: function() {
    var el = document.getElementsByClassName('typed-cursor')[0];
    el.style.display = 'none';
  }
});

setTimeout(function() {
  document.querySelector('.choice').classList.add('show');
}, 1000);


