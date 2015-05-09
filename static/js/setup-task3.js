var debug = false;
var hasLoggedIn = false;
var loggedInPrompt = 'bbadguy> ';

function displayTask2Modal() {
  vex.dialog.alert({
    message: 'Awesome! You must\'ve exploited Badguy\'s use of a common modulus.<br><br>The Common Modulus Attack was first publicized by Simmons in his 1983 paper <b><a target="_blank" href="http://www.tandfonline.com/doi/abs/10.1080/0161-118391857900">A "Weak" Privacy Protocol Using the RSA Crypto Algorithm</a></b>.<br><br>In the paper, Simmons proved that encrypting a single message with different exponents but the same modulus was an insecure pattern—a lesson that Badguy will be learning the hard way.',
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
  onStart: debug ? null : displayTask2Modal,
  setupNewTerminal: function(term) {
    hasLoggedIn = true;
    term.echo('Login successful...');
    term.echo('Welcome back, bbadguy!');
    term.set_prompt(loggedInPrompt);
  },
  parseCommand: parseCommand
};

setupTask(options);
