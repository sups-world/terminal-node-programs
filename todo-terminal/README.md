## process.argv

- It is an array that contains the command-line arguments passed when running a node script

`node todo.js add "Buy milk"`

### Node sees it as

```js
process.argv = [
  "/usr/bin/node", // argv[0] → the node executable path
  "/path/to/todo.js", // argv[1] → the script file path
  "add", // argv[2] → your first argument
  "Buy milk", // argv[3] → your second argument
];
```

## NOTE: Before executing the file, please allow necessary permissions with

`chmod +x todo.js`

- THis turns the .js file into a runnable script.
  - Run using `./todo.js command`

## Detailing process.argv[]

| Code              | Meaning                                                     |
| ----------------- | ----------------------------------------------------------- |
| `process.argv[0]` | Path to Node                                                |
| `process.argv[1]` | Path to the script (todo.js)                                |
| `process.argv[2]` | First real argument → the command ("add", "list", "delete") |
| `process.argv[3]` | Second real argument → extra data (task text or id)         |

- Further explanation

```js
process.argv = [
  "/usr/bin/node", // argv[0] → the node executable path
  "/path/to/todo.js", // argv[1] → the script file path
  "add", // argv[2] → your first argument
  "Buy milk", // argv[3] → your second argument
];
```

---

# Enhancements

- Remove all done items with one command
- Bring unmarked to the top
