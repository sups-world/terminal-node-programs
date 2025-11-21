# CLI Timer (Pomodoro) app

I wanted a less distracting, lightweight pomodoro timer. So I built this app using node.js

## Features

- Single cycle pomodoro timer
- Individual fixed sessions from the pomodoro: work and break
- Custom timer which asks for minutes to be entered by user

## Installation/Operation

1. Make the script executable

```bash
chmod +x timer.js
```

2. Run the app as follows

```bash
./timer.js custom
./timer.js pomo start
./timer.js work

```

---

## Glossary

### Bell sound

```js
process.stdout.write(`\x07`);
```

- This special ASCII character triggers a terminal "beep" sound.I have used this to notify when a timer ends

### Getting user input for custom timer

```js
import readline from "node:readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer));
  });
}
```

- I used this readline module to read input from user.
- The askQuestion function is asynchronous because it needs to wait for the user's response.So I wrapped it in a promise.

---

## Future Enchancements/Ideas

I explored keypress handling while building this tool. I was thinking about stop and reset features in timer. It has given me ideas for future interactive tools, though it is not implemented in current timer program.
