var debug = true;
var hasLoggedIn = true;
var loggedInPrompt = 'bbadguy> ';
var isChatting = false;
var chatPrompt = 'swissco-official: ';
var chatID = Math.floor(Math.random()*1000);

function displayTask5Modal() {
  vex.dialog.alert({
    message: 'Message about Task 5.',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

function parseCommand(command, term) {
  if (hasLoggedIn && command.match(/^chat \S+$/)) {
    var m = command.split(' ')[1];
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5000/startChat/' + chatID,
      data: { 'username': m }
    }).done(function(result) {
      term.echo(m + ' is online');
      term.set_prompt(chatPrompt);
      isChatting = true;
    })
    .fail(function() {
      term.error('User ' + m + ' is not online');
      term.set_prompt(loggedInPrompt);
    })
    term.set_prompt('');
    return true;
  } else if (isChatting) {
  	var m = command;
	$.ajax({
      type: 'POST',
      url: 'http://localhost:5000/chat/' + chatID,
      data: { 'username': m }
    }).done(function(result) {
      term.echo("searly1965: " + result);
    })
    .fail(function() {
    	term.error("There was an error connecting with the chat server. Please reload.");
      console.log("Server Error. Shouldn't get here.");
    })
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
    displayTask5Modal();
  }
};

setupTask(options);
