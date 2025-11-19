# CLI Todo App

A simple CLI(Command Line Interface) todo list app built using node.js.
Manages tasks directly from the terminal

---

## Features

- Add new tasks
- Remove task
- Toggle complete status of task
- Mark all tasks as completed
- Delete all completed tasks
- Move all incomplete tasks to the top
- JSON-based storage

## Installation / Operation

1. Make the script executable

```bash
chmod +x todo.js
```

2. Run the app as follows

```bash
./todo.js add "Go for a run"
./todo.js list

```

---

## Glossary

## process.argv

- It is an array that contains the command-line arguments passed when running a node script

`node todo.js add "Buy milk"`

### Node sees it as

```js
process.argv = [
  "/usr/bin/node", // argv[0] → the node executable path
  "/path/to/todo.js", // argv[1] → the script file path
  "add", // argv[2] → user's first argument
  "Buy milk", // argv[3] → user's second argument
];
```

## NOTE: Before executing the file, please allow necessary permissions with

`chmod +x todo.js`

- This turns the .js file into a runnable script.
  - Run using `./todo.js command`

## Detailing process.argv[]

| Code              | Meaning                                                     |
| ----------------- | ----------------------------------------------------------- |
| `process.argv[0]` | Path to Node                                                |
| `process.argv[1]` | Path to the script (todo.js)                                |
| `process.argv[2]` | First real argument → the command ("add", "list", "delete") |
| `process.argv[3]` | Second real argument → extra data (task text or id)         |

---
