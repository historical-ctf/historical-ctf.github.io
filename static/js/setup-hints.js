(function() {

// Setup help modal
function initializeModal() {
  var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];
  if (modalInitializer) {
    // Setup handler
    modalInitializer.onclick = function() {
      vex.dialog.alert(hints[hintIndex++]);

      // Make the next hint visible
      initializeModal();
    };

    // Fade in
    modalInitializer.style.visibility = 'visible';
    $(modalInitializer).animate({
      'opacity': 1.0
    }, 1000);
  }
}

var hintIndex = 0;
var hints = [
  'The original implmentation of RSA had some critical security flaws. Try searching for "Textbook RSA" and use if you can use what you find to figure out Badguy\s password',
  'You did well!',
  'That was great!'
];

initializeModal();

})();
