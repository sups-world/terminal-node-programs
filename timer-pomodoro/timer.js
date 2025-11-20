#!/usr/bin/env node

const command = process.argv[2];
const argument = process.argv.slice(3).join(" ");

function test() {
  let count = 4;
  console.log("Timer started");
  console.log("Remaining time : ");
  let intervalId = setInterval(() => {
    count--;
    // console.log("Time remaining : ", count);
    let displayItem = count.toString();
    process.stdout.write(`\r -> ${displayItem}`);
    if (count === 0) {
      clearInterval(intervalId);
      console.log(" \n Timer complete");
    }
  }, 1000);
}

//Command router
switch (command) {
  case "test":
    test();
    break;
  default:
    console.log(`welcome to pomodoro timer`);
}
