(function() {

var hintIndex;
var hints;

function setTask1Hints() {
  hintIndex = 0;
  hints = [
    'The original implementation of RSA had some critical security flaws. Try searching for "Textbook RSA" and see if you can use what you find to figure out Badguy\'s password.',
    'You may have realized that the original version of RSA is completely <b>deterministic</b>; the same password encrypted with the same public key will produce the same ciphertext. Try encrypting some common passwords with Badguy\'s public key.',
    'Try <a target="_blank" href="/static/scripts/task1/dictionary.txt">this</a> list of common passwords.',
    'If you\'re having trouble, check out this <a target="_blank" href="/static/scripts/task1/solution.py">reference solution</a>, which relies on our <a target="_blank" href="/static/scripts/task1/dictionary.txt">list of common passwords</a>. Run it to crack Badguy\'s password! Don\'t expect everything in life to be this easy.'
  ];
}

function setTask2Hints() {
  hintIndex = 0;
  hints = [
    'Try poking around Badguy\'s server to discover a security flaw to exploit. Chat logs are always a good place to start.',
    'You may have noticed that Badguy sent two identical messages using the same modulus and two different exponents. One might even call it a "common" modulus.',
    'To get you going with the Common Modulus Attack, try this <a target="_blank" href="/static/scripts/task2/skeleton.py">skeleton code</a> and a new <a target="_blank" href="static/scripts/task2/util.py">utility file</a>.',
    'If you\'re having trouble, check out this <a target="_blank" href="/static/scripts/task2/solution.py">reference solution</a>.'
  ];
}

function setPreTask3Hints() {
  hintIndex = 0;
  hints = [
    'Look in Badguy\'s diary on the previous server for some login credentials.',
    'Too lazy to check? Try the username `bbadguy` with the password `rootabega`.'
  ];
}

function setTask3Hints() {
  hintIndex = 0;
  hints = [
    'Has Badguy really learned his lesson? Do you think there are any issues with using a small public exponent with multiple moduli?',
    'Try searching for "Low public exponent attack," along with the ciphertexts of the bank name in the wire-transfers, to figure out where Badguy has been storing his ill-gotten gains.',
    'To get you started executing a low public exponent attack, <a target="_blank" href="/static/scripts/task3/skeleton.py">here\'s</a> some skeleton code and a new <a target="_blank" href="static/scripts/task3/util.py">utility file</a>.',
    'And once again, <a target="_blank" href="/static/scripts/task3/solution.py">a reference solution</a>, your heiness.'
  ];
}

function setTask5Hints() {
  hintIndex = 0;
  hints = [
    'If you don\'t know where to start, try skimming pages 5 and 6 of this paper from <a target="_blank" href="https://www.cs.jhu.edu/~fabian/courses/CS600.624/Timing-full.pdf">Dhem et al.</a>',
    'In the skeleton, the goal of the `reduction_required` function is to check if the value needs to be reduced at the point corresponding to the number of bits we know for sure.<br><br>Here\'s a <a target="_blank" href="/static/scripts/task5/skeleton2.py">more complete skeleton</a> that fills in that function.',
    'The key idea behind this attack: when solving for the k-th bit of the private key, you collect a bunch of integers that <i>do</i> require a modular reduction (after k iterations of the square and multiply algorithm) and a bunch of integers that <i>don\'t</i>.<br><br>Then, you can compare the mean timing required to run the square and multiply algorithm on these two distinct sets of integers.<br><br>Try sampling 50 integers for each set from a normal distribution (mean: sqrt(N), standard deviation: N). Then compare the average time required to run the square and multiply algorithm over the members of each set.',
    'Still having trouble? Here\'s another <a target="_blank" href="/static/scripts/task5/skeleton3.py">even more complete skeleton</a> that fills in the sampling function.',
    'I don\'t blame you—this is the toughest challenge yet. Here\'s the <a target="_blank" href="/static/scripts/task5/solution.py">solution</a>, which takes a few minutes to run, but should spit out the right answer.'
  ];
}

function setTask6Hints() {
  hintIndex = 0;
  hints = [
    'First hint for Task 6',
    'Second hint for Task 6',
    'Third hint for Task 6'
  ];
}

// Helper function to prepare next modal
function initializeModal() {
  if (hintIndex < hints.length) {
    var modalInitializer = document.getElementsByClassName('help-button')[hintIndex];

    // Setup handler
    modalInitializer.onclick = function() {
      /* Kind of a hack: if we just logged in, switch to hints for Task 2 */
      if (window.justLoggedIn) {
        if (window.task == 1) {
          setTask2Hints();
        } else if (window.task == 3) {
          setTask3Hints();
        } else if (window.task == 6) {
          setTask6Hints();
        }
        window.justLoggedIn = false;
      }

      var clicked = $('.help-button').index($(this));
      vex.dialog.alert(hints[clicked]);
      if (hintIndex === clicked) {
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

// Initialize hints
if (window.task == 1) {
  setTask1Hints();
} else if (window.task == 3) {
  setPreTask3Hints();
} else if (window.task == 5) {
  setTask5Hints();
} else if (window.task == 6) {
  setTask6Hints();
}
initializeModal();

})();
