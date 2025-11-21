import readline from "node:readline";

//enable keypress
readline.emitKeypressEvents(process.stdin);

//set stdin to raw mode to handle keypresses directly
process.stdin.setRawMode(true);

//Listen for the keypress
export async function keyPressListener() {
  return new Promise((resolve) => {
    process.stdin.on("keypress", (str, key) => {
      // To allow Exit on Ctrl+C
      if (key.sequence === "\u0003") {
        // \u0003 is the ASCII code for Ctrl+C
        console.log("Exiting...");
        process.exit();
      }

      // Log the keypress details
      console.log(`Key pressed: ${str || "Special Key"}`);
      console.log("Key object:", key);

      // Perform actions based on specific keypresses
      if (key.name === "up") {
        console.log("Up arrow pressed!");
      } else if (key.name === "down") {
        console.log("Down arrow pressed!");
      } else if (str === "h") {
        console.log('You pressed the "h" key.');
      }
    });
    resolve();
  });
}
