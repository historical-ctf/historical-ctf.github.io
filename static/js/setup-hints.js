(function() {

// Setup help modal
function initializeModal() {
  var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];
  if (hintIndex < hints.length)
    modalInitializer.hint = hints[hintIndex++];
  console.log(hintIndex);
  if (modalInitializer) {
    // Setup handler
    modalInitializer.onclick = function() {
      if (!modalInitializer.used) {
        // Render this hint as used
        modalInitializer.used = true;

        // Fade out
        $(modalInitializer).animate({
          'opacity': 0.6
        }, 1000);

        // Make the next hint visible
        initializeModal();
      }
      vex.dialog.alert(modalInitializer.hint);
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
  'Try <a href="/static/scripts/dictionary.txt">this</a> list of common passwords.',
  'Click <a href="/static/scripts/solution.py">here</a> for a reference solution, which relies on <a href="/static/scripts/dictionary.txt">this list of common passwords</a>. Run it to crack Badguy\'s password! Don\'t expect everything in life to be this easy.'
];

initializeModal();

})();
