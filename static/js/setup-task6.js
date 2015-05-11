var debug = true;
var hasLoggedIn = true;
var loggedInPrompt = 'sh> ';
var isChatting = false;
var chatPrompt = 'swissco-official: ';
var chatID;

function displayTask6Modal() {
  vex.dialog.alert({
    message: 'Congratulations! You\'ve put Badguy behind bars!',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

function parseCommand(command, term) {
  if (hasLoggedIn && command.match(/^chat \S+$/)) {
    var m = command.split(' ')[1];
    $.ajax({
      type: 'POST',
      url: 'https://historical-ctf.herokuapp.com/startChat/' + chatID,
      data: { 'screename': m }
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
      url: 'https://historical-ctf.herokuapp.com/chat/' + chatID,
      data: { 'message': m }
    }).done(function(result) {
      term.echo("searly1965: " + result);
      term.set_prompt(chatPrompt);
      if (result.indexOf("Boole") > -1) {
        displayTask6Modal();
      }
    })
    .fail(function(result) {
    	term.error("There was an error connecting with the chat server. Please reload.");
      console.log(result);
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
  }
};

chatID = Math.floor(Math.random()*1000),
setupTask(options);
