#!/usr/bin/env node

const command = process.argv[2];
const argument = process.argv.slice(3).join(" ");

async function timerOperation(mode, allotedMinutes) {
  let modeName = "Custom-time";
  let startMessage = "";
  let endMessage = "";

  let count = parseInt(allotedMinutes) * 60;
  switch (mode) {
    case "work":
      startMessage = `\n Work timer has commenced for ${allotedMinutes} minutes !!!`;
      endMessage = `Work timer for ${allotedMinutes} has ended !!!`;
      break;
    case "shortBreak":
      startMessage = `\n Short break timer has commenced for ${allotedMinutes} minutes !!!`;
      endMessage = `Short break timer for ${allotedMinutes} has ended !!!`;
      break;
    case "longBreak":
      startMessage = `\n Long break timer has commenced for ${allotedMinutes} minutes !!!`;
      endMessage = `Long break timer for ${allotedMinutes} has ended !!!`;
      break;
    default:
      startMessage = `\n Timer has commenced for ${allotedMinutes} minutes !!!`;
      endMessage = `Timer for ${allotedMinutes} has ended !!!`;
      break;
  }
  console.log(startMessage);
  console.log("Remaining time : ");

  return new Promise((resolve) => {
    let intervalId = setInterval(() => {
      count--;
      const displayMinutes = parseInt(count / 60)
        .toString()
        .padStart(2, "0");
      const displaySeconds = parseInt(count % 60)
        .toString()
        .padStart(2, "0");
      // let displayItem = count.toString();
      process.stdout.write(
        `\r     ->  ${displayMinutes} mm : ${displaySeconds} ss`
      );
      if (count === 0) {
        clearInterval(intervalId);
        console.log(`\n ${endMessage}`);
        resolve();
      }
    }, 1000);
  });
}

async function timerMode(mode, allotedMinutes) {
  switch (mode) {
    case "shortBreak":
      await timerOperation(mode, 5);
      break;
    case "longBreak":
      await timerOperation(mode, 15);
      break;
    case "work":
      await timerOperation(mode, 25);
      break;
    default:
      console.log("Mode is not defined");
  }
}

async function pomoCycle(operationType) {
  switch (operationType) {
    case "start":
      console.log("Let's commence !!");
      // await timerMode("work");
      // await timerMode("shortBreak");
      // await timerMode("work");
      // await timerMode("shortBreak");

      await timerMode("work");
      await timerMode("shortBreak");
      await timerMode("work");
      await timerMode("longBreak");
      console.log("\n The session has concluded !!!");
      break;
    default:
      console.log("Invalid command");
  }
}

//Command router
switch (command) {
  case "work":
    timerMode("work");
    break;
  case "sb":
    timerMode("shortBreak");
    break;
  case "lb":
    timerMode("longBreak");
    break;
  case "pomo":
    pomoCycle(argument);
    break;

  default:
    console.log(`welcome to pomodoro timer !!!
      Available commands
      1. work mode(25 minutes)  -> ./timer.js work
      2. short break(5 minutes) -> ./timer.js sb
      3. long break(15 minutes) -> ./timer.js lb
      4. Pomodoro cycle -> ./timer.js pomo start
      `);
}
