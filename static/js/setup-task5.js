var debug = true;

function parseCommand(command, term) {
  if (command.match(/^encrypt \S+$/)) {
    return true;
  }
}

var options = {
  parseCommand: parseCommand
};

setupTask(options);
