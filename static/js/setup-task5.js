(function() {

var debug = false;

function parseCommand(command, term) {
  if (command.match(/^encrypt \S+$/)) {
    return true;
  }
}

var options = {
  parseCommand: parseCommand
};

setupTask(options);

})();
