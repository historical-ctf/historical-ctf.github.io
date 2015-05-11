var debug = false;
var hasLoggedIn = true;
var loggedInPrompt = 'sh> ';
var isChatting = false;
var chatPrompt = 'swissco-official: ';
var chatState;

function displayTask6Modal() {
  vex.dialog.alert({
    message: 'Congratulations! You\'ve put Badguy behind bars!<br><br>The goal of this challenge was to execute a Social Engineering Attack.<br><br>In the day-to-day, these attacks take the form of phishing emails and other psychologically manipulative techniques. While they\'re not strictly "technical", Social Engineering Attacks are nonetheless a part of information security and an important area of research (see, for example, Dhamija and Tygar\'s 2005 paper, <b><a target="_blank" href="https://dl.acm.org/citation.cfm?id=1073009">The Battle Against Phishing</b></a>).<br><br>Thanks for playing the Historical CTF, and congratulations again on putting an end to Badguy\'s reign of terror!',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

function parseCommand(command, term) {
  if (hasLoggedIn && command.match(/^chat \S+$/)) {
    var m = command.split(' ')[1];
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/startChat/',
      url: (debug) ? 'http://localhost:5000/startChat/': 'https://historical-ctf.herokuapp.com/startChat/',
      data: { 'screename': m }
    }).done(function(result) {
      term.echo(m + ' is online');
      term.set_prompt(chatPrompt);
      isChatting = true;
      chatState = 0;
    })
    .fail(function() {
      term.error('User ' + m + ' is not online');
      term.set_prompt(loggedInPrompt);
    });
    term.set_prompt('');
    return true;
  } else if (isChatting) {
    var m = command;
  	$.ajax({
      type: 'POST',
      url: (debug) ? 'http://localhost:5000/chat/' : 'https://historical-ctf.herokuapp.com/chat/',
      data: { 'message': m, 'state': chatState }
    }).done(function(result) {
      temp = result.split('|');
      term.echo("searly1965: " + temp[1]);
      chatState = temp[0];
      console.log(chatState);
      term.set_prompt(chatPrompt);
      if (result.indexOf("Boole") > -1) {
        displayTask6Modal();
      }
    })
    .fail(function(result) {
    	term.error("There was an error connecting with the chat server. Please reload.");
      console.log(result);
      console.log("Server Error. Shouldn't get here.");
    });
    term.set_prompt('');
    return true;
  }
}

var options = {
  parseCommand: parseCommand,
  onInit: function(term) {
    term.set_command('chat {screename}');
    hasLoggedIn = true;
    term.echo('');
  }
};

setupTask(options);
