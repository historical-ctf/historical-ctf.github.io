(function() {

var debug = false;

function displayTask1Modal() {
  vex.dialog.alert({
    message: '<b>Welcome to Task 2</b><br><br>Good job! You\'re now inside Badguy\'s server.<br><br>The key to the previous challenge was that so-called "Textbook RSA" is a deterministic protocol. So if you encrypt the same message twice, you get the same ciphertext.<br><br>Over time, researchers have incorporated randomness into RSA through protocols like <a href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding" target="_blank">OAEP encoding</a>.',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

var options = {
  targetURL: debug ? 'http://localhost:5000/login/' : 'https://historical-ctf.herokuapp.com/login/2',
  onLogin: displayTask1Modal,
  setupNewTerminal: function(term) {
    term.echo('Login successful...');
    term.echo('Welcome back, bbadguy!');
    term.set_prompt('bbadguy> ');
  }
};

setupTask(options);

})();
