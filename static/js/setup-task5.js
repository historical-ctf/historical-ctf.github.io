(function() {

var debug = false;

function displayTask5Modal() {
  vex.dialog.alert({
    message: 'Great! With your help, the FBI was able to decrypt Badguy\'s hard drive.<br><br>Timing Attacks were popularized by Paul Kocher, who, in 1996, released his seminal paper, <b><a target="_blank" href="http://link.springer.com/chapter/10.1007/3-540-68697-5_9">Timing Attacks on Implementations of Diffie-Hellman, RSA, DSS, and Other Systems</a></b>. They\'re in a class of attacks known as "Side Channel Attacks", which focus on exploiting vulnerabilities based on physical implementations.<br><br>Oh yeah: and we\'ve got one more challenge for you. <a href="/task6.html" target="_blank">It\'s time to talk to Badguy himself</a>.',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}


function parseCommand(command, term) {
  if (command.match(/^decrypt \S+$/)) {
    var key = command.split(' ')[1];
    $.ajax({
      type: 'POST',
      url: (debug) ? 'http://localhost:5000/submit-key/' : 'https://historical-ctf.github.io/submit-key/',
      data: { 'key': key }
    }).done(function(result) {
      term.echo('Success!');
      displayTask5Modal();
    })
    .fail(function() {
      term.error('Incorrect key');
    })
    .always(function() {
      term.set_prompt('sh> ');
    });
    term.set_prompt('');
    return true;
  }
}

var options = {
  parseCommand: parseCommand,
  onInit: function(term) {
    term.set_command('decrypt {key}');
    term.echo('');
  }
};

setupTask(options);

})();
