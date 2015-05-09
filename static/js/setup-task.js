(function() {
var debug = true;

var fs = {
  '~': {}
};

var homeDir = '~';
var currentDir = [homeDir];
var state = 'fs';
var username;
var password;

function clearHints() {
  $('.help-button').each(function(index) {
    if (index == 0)
      $(this).fadeTo('slow', 1);
    else {
      $(this).fadeTo('slow', 0, function() {
        $(this).css('visibility', "hidden");
      });
    }
  });

  // Set to Task 2 so that the hints reset
  window.justLoggedIn = true;
}

function displayTask1Modal() {
  vex.dialog.alert({
    message: 'Good job! You\'re now inside Badguy\'s server.<br><br>The key to the previous challenge was that so-called "Textbook RSA" is a deterministic protocol. So if you encrypt the same message twice, you get the same ciphertext.<br><br>Over time, researchers have incorporated randomness into RSA through protocols like <a href="https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding" target="_blank">OAEP encoding</a>.',
    // Have to include 'vex-theme-plain' or it clobbers the default class
    className: 'vex-theme-plain congratulatory-modal'
  });
}

function onTask1Complete() {
  displayTask1Modal();
  clearHints();
}

/* Directory navigation */
function navigateToDir(dir) {
  // Navigate to directory
  var dirContents = fs;
  for (var i = 0; i < dir.length; i++) {
    dirContents = dirContents[dir[i]];
  }
  return dirContents;
}

function dirExists(currentDir, dir) {
  var dirContents = navigateToDir(currentDir);
  var dest = dirContents[dir];
  return (dest && typeof(dest) == 'object');
}

function getFileContents(currentDir, filename) {
  var dirContents = navigateToDir(currentDir);
  return dirContents[filename];
}

function fileExists(currentDir, filename) {
  var dirContents = navigateToDir(currentDir);
  var dest = dirContents[filename];
  return (dest && typeof(dest) == 'string');
}

function navigatePath(currentDir, path) {
  // If it ends in a trailing slash, get rid of it
  if (!path[path.length - 1]) {
    path.pop();
  }

  // Attempt to find destination directory
  var tempDir = currentDir.slice();
  for (var i = 0; i < path.length; i++) {
    var nextDir = path[i];
    if (nextDir == '..' && tempDir.length > 1) {
      tempDir.pop();
    }
    else if (dirExists(tempDir, nextDir)) {
      tempDir.push(nextDir);
    } else {
      term.error("No such directory");
      return;
    }
  }
  return tempDir;
}

function autocomplete(currentDir, rawPath) {
  // Split into path and current file being tab-completed
  var locs = rawPath.split('/');
  var paths = locs.slice(0, -1);
  var name = locs[locs.length - 1];

  // Check for a match
  var matches = [];
  var dirContents = navigateToDir(navigatePath(currentDir, paths));
  for (var nextStep in dirContents) {
    if (nextStep.slice(0, name.length) == name) {
      // If you've already matched, just return none--don't want to deal with
      // multiple matches
      matches.push(nextStep);
    }
  }
  // Add prefix to each match
  var prefix = paths.join('/');
  if (prefix) {
    prefix += '/';
  }
  for (var i = 0; i < matches.length; i++) {
    matches[i] = prefix + matches[i];
  }
  return matches;
}

// Setup terminal emulator
jQuery(function($, undefined) {
  $('#terminal').terminal(function(command, term) {
    console.log('Command:', command);

    if (state == 'fs') {
      command = command.trim();
      /* Change directory */
      if (command.match(/^cd$/)) {
        currentDir = [homeDir];
        var dirString = currentDir.join('/');
        term.echo(dirString);
      }
      else if (command.match(/^cd (\w|\/|\.\.)+$/)) {
        var path = command.split(' ')[1].split('/');
        var finalDir = navigatePath(currentDir, path);
        // Path navigation success
        if (finalDir) {
          currentDir = finalDir;
          var dirString = currentDir.join('/');
          term.echo(dirString);
        }
      }
      /* List files */
      else if (command.match(/^ls$/)) {
        // Navigate to current directory
        var dirContents = navigateToDir(currentDir);

        // Print contents
        for (var fileOrDir in dirContents) {
          term.echo(fileOrDir);
        }
      } else if (command.match(/^ls (\w|\/|\.\.)+$/)) {
        var path = command.split(' ')[1].split('/');
        var finalDir = navigatePath(currentDir, path);
        // Path navigation success
        if (finalDir) {
          // Navigate to current directory
          var dirContents = navigateToDir(finalDir);

          // Print contents
          for (var fileOrDir in dirContents) {
            term.echo(fileOrDir);
          }
        }
      }
      /* Print files */
      else if (command.match(/^cat (\w|\/)*\.?\w+$/)) {
        var locs = command.split(' ')[1].split('/');
        var paths = locs.slice(0, -1);
        var filename = locs[locs.length - 1];

        // Find final file
        var tempDir = currentDir.slice().concat(paths);

        if (fileExists(tempDir, filename)) {
          term.echo(getFileContents(tempDir, filename));
        } else {
          term.error("No such file");
        }
      }
      /* Login attempt */
      else if (command.match(/^login$/)) {
        state = 'userid';
        term.set_prompt('username: ');
      } else if (command.match(/^head(.*)/) || command.match(/^less (.*)/)) {
        term.error("Sorry—you don't have access to that command. Try using `cat`.");
      } else if (command) {
        term.error("Invalid command");
      }
    }

    else if (state == 'userid') {
      username = command;
      term.set_prompt('password: ');
      state = 'password';
    }

    else if (state == 'password') {
      password = command;
      state = null;

      // Send login attempt
      $.ajax({
        type: 'POST',
        url: debug ? 'http://localhost:5000/login/' : 'https://historical-ctf.herokuapp.com/login/',
        data: {
          'username': username,
          'password': password
        }
      }).done(function(result) {
        fs[homeDir] = JSON.parse(result);
        term.echo('Login successful...');
        term.echo('Welcome back, bbadguy!');
        term.set_prompt('bbadguy> ');
        state = 'fs';

        // Run handler, which resets hints and displays a modal
        onTask1Complete();
      })
      .fail(function() {
        term.echo('Login unsuccessful...');
        term.set_prompt('sh> ');
      })
      .always(function() {
        state = 'fs';
      });
      term.set_prompt('');
    }
  }, {
    greetings: null,
    name: 'term',
    height: '100%',
    prompt: 'sh> ',
    onInit: function(term) {
      term.set_command('login')
      term.echo('')
    },
    tabcompletion: true,
    completion: function(term, currCommand, callback) {
      var matches = autocomplete(currentDir, currCommand);
      // If a single match, replace command
      if (matches.length === 1) {
        var guess = matches[0];
        var fullCommand = term.get_command();
        var finalCommand = fullCommand.split(' ');
        finalCommand[finalCommand.length - 1] = guess;
        term.set_command(finalCommand.join(' '));
      } else if (matches.length) {
        // var fullCommand = term.get_command();
        // term.set_command('');
        // for (var i = 0; i < matches.length; i++) {
        //   term.echo(matches[i]);
        // }
        // term.set_command(fullCommand);
      }
    }
  });
});

displayTask1Modal();

})();
