#!/usr/bin/env node
import fs from "fs";

const DB_FILE = "./todos.json";

//Utility to load existing list
function loadCurrentItems() {
  if (!fs.existsSync(DB_FILE)) return [];
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

//Utility to save todos
function saveTodos(todos) {
  fs.writeFileSync(DB_FILE, JSON.stringify(todos, null, 2));
}

// CLI commands
const command = process.argv[2];
const argument = process.argv[3];

function test() {
  console.log("Testing 1 2 3");
}

function listItems() {
  const todos = loadCurrentItems();

  if (todos.length === 0) {
    console.log("No lists found");
    return;
  }

  console.log(`\nYour todo list: \n`);
  todos.forEach((t) => {
    const status = t.done ? "✔" : "✖";
    console.log(`${t.id}.[${status}] ${t.text}`);
  });
  console.log("");
}

function addItem(text) {
  if (!text) {
    console.log("Please provide a text item to add");
    return;
  }

  const todos = loadCurrentItems();
  const newTodo = {
    id: todos.length + 1,
    text,
    done: false,
  };

  todos.push(newTodo);
  saveTodos(todos);

  console.log(`Added: ${text}`);
}

function markDone(itemNumber) {
  const todos = loadCurrentItems();

  const item = todos.find((t) => t.id === Number(itemNumber));

  if (!item) {
    console.log("Item not found");
    return;
  }

  item.done = item?.done ? false : true;

  saveTodos(todos);

  console.log(`Marked : ${item.text}`);
}

function deleteItem(itemNumber) {
  const todos = loadCurrentItems();

  const newTodos = todos.filter((t) => t.id !== Number(itemNumber));

  if (todos.length === newTodos.length) {
    console.log("Item not found");
    return;
  }

  //Reassign IDs so they become 1,2,3..
  const arrangedIdList = newTodos.map((t, index) => {
    return { ...t, id: index + 1 };
  });

  saveTodos(arrangedIdList);
  console.log(`Deleted item successfully`);
}

// Command router
switch (command) {
  case "test":
    test();
    break;
  case "list":
    listItems();
    break;
  case "add":
    addItem(argument);
    break;
  case "mark":
    markDone(argument);
    break;
  case "delete":
    deleteItem(argument);
    break;
  default:
    console.log("CLI terminal");
}
