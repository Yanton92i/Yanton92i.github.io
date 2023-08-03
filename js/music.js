document.addEventListener("DOMContentLoaded", function() {
  // Get a reference to the button element
  var start_button = document.getElementById("start_button");

  // Add a click event listener to the button
  start_button.addEventListener("click", function() {
    // Create an audio element
    var audio = new Audio("music/xboy.mp3");
    
    // Enable looping for the audio
    audio.loop = true;
    
    // Play the audio file
    audio.play();
  });
});
