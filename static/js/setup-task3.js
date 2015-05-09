var debug = true;
var hasLoggedIn = false;
var loggedInPrompt = 'bbadguy> ';

function displayTask1Modal() {
  vex.dialog.alert({
    message: 'Good job! You\'re now inside Badguy\'s server.<br><br>The key to the previous challenge was that so-called "Textbook RSA" is a deterministic protocol. So if you encrypt the same message twice, you get the same ciphertext.<br><br>Over time, researchers have incorporated randomness into RSA through protocols like <a href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding" target="_blank">OAEP encoding</a>.',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

function parseCommand(command, term) {
  if (hasLoggedIn && command.match(/^sign \S+$/)) {
    var m = command.split(' ')[1];
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/sign/',
      data: { 'message': m }
    }).done(function(result) {
      term.echo('Signed message: ' + result);
    })
    .fail(function() {
      term.error('Will not sign');
    })
    .always(function() {
      term.set_prompt(loggedInPrompt);
    });
    term.set_prompt('');
    return true;
  }
}

var options = {
  targetURL: debug ? 'http://localhost:5000/login/3' : 'https://historical-ctf.herokuapp.com/login/3',
  onLogin: displayTask1Modal,
  setupNewTerminal: function(term) {
    hasLoggedIn = true;
    term.echo('Login successful...');
    term.echo('Welcome back, bbadguy!');
    term.set_prompt(loggedInPrompt);
  },
  parseCommand: parseCommand
};

setupTask(options);
