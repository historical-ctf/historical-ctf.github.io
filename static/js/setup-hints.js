(function() {

// Setup help modal
function initializeModal() {
  var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];
  if (modalInitializer) {
    // Setup handler
    modalInitializer.onclick = function() {
      /* Kind of a hack: if we just logged in, switch to hints for Task 2 */
      if (justLoggedIn) {
        hints = [
        "Try poking around Badguy's server to discover a security flaw to exploit. Chat logs might be particularly useful..",
        "You may have noticed that Badguy sent two identical messages using the same modulus and two different exponents. Try researching \"Common Modulus attacks\".",
        "To get you going with the common modulus attack, <a href=\"static/scripts/skeleton2.py\">here's</a> some skeleton code and another <a href=\"static/scripts/util2.py\">util</a> file",
        "Click <a href=\"/static/scripts/solution2.py\">here</a> for another reference solution. We're making this too easy for you!"];
        hintIndex = 0;
        justLoggedIn = false;
      }

      var clicked = $('.help-button').index($(this));
      vex.dialog.alert(hints[clicked]);
      if (hintIndex == clicked)
        hintIndex++;

      // Fade out old hint
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
  'Try <a href="/static/scripts/dictionary.txt">this</a> list of common passwords.',
  'Click <a href="/static/scripts/solution.py">here</a> for a reference solution, which relies on <a href="/static/scripts/dictionary.txt">this list of common passwords</a>. Run it to crack Badguy\'s password! Don\'t expect everything in life to be this easy.'
];

initializeModal();

})();
