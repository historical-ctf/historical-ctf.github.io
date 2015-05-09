(function() {

var hintIndex;
var hints;

function setTask1Hints() {
  hintIndex = 0;
  hints = [
    'The original implementation of RSA had some critical security flaws. Try searching for "Textbook RSA" and see if you can use what you find to figure out Badguy\'s password.',
    'You may have realized that the original version of RSA is completely <b>deterministic</b>; the same password encrypted with the same public key will produce the same ciphertext. Try encrypting some common passwords with Badguy\'s public key.',
    'Try <a href="/static/scripts/dictionary.txt">this</a> list of common passwords.',
    'If you\'re having trouble, check out this <a href="/static/scripts/solution.py">reference solution</a>, which relies on our <a href="/static/scripts/dictionary.txt">list of common passwords</a>. Run it to crack Badguy\'s password! Don\'t expect everything in life to be this easy.'
  ];
}

function setTask2Hints() {
  hintIndex = 0;
  hints = [
    'Try poking around Badguy\'s server to discover a security flaw to exploit. Chat logs are always a good place to start.',
    'You may have noticed that Badguy sent two identical messages using the same modulus and two different exponents. One might even call it a "common" modulus.',
    'To get you going with the Common Modulus Attack, try this <a href="/static/scripts/skeleton2.py">skeleton code</a> and a new <a href="static/scripts/util2.py">utility file</a>.',
    'If you\'re having trouble, check out this <a href="/static/scripts/solution2.py">reference solution</a>.'
  ];
}

// Setup help modal
function initializeModal() {
  var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];
  if (modalInitializer) {
    // Setup handler
    modalInitializer.onclick = function() {
      /* Kind of a hack: if we just logged in, switch to hints for Task 2 */
      if (window.justLoggedIn) {
        setTask2Hints();
        window.justLoggedIn = false;
      }

      var clicked = $('.help-button').index($(this));
      vex.dialog.alert(hints[clicked]);
      if (hintIndex == clicked) {
        hintIndex++;
      }

      // Fade out old hint
      $(this).fadeTo('slow', 0.5);

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

setTask1Hints();
initializeModal();

})();
