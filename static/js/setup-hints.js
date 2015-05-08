(function() {

// Setup help modal
function initializeModal() {
  var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];
  if (modalInitializer) {
    // Setup handler
    modalInitializer.onclick = function() {
      var clicked = $('.help-button').index($(this));

      vex.dialog.alert(hints[clicked]);
      if (hintIndex == clicked)
        hintIndex++;
      $(this).fadeTo("slow", 0.5);

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
  'The original implmentation of RSA had some critical security flaws. Try searching for "Textbook RSA" and see if you can use what you find to figure out Badguy\'s password.',
  'You may have realized that the original version of RSA is completely <b>deterministic</b>; the same password encrypted with the same public key will produce the same ciphertext. Try encrypting some common passwords with Badguy\'s public key.',
  'Click <a>here</a> for a reference solution. Run it to crack Badguy\'s password! Don\'t expect everything in life to be this easy.'
];

initializeModal();

})();
