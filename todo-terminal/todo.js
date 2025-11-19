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
// anything inside the array becomes a string
// const argument = process.argv[3];
//To allow addition without inverted commas eg: ./todo.js add Buy grocery
const argument = process.argv.slice(3).join(" ");

function reArrangeIdInList(obtainedArray) {
  const newArray = obtainedArray.map((t, index) => {
    return { ...t, id: index + 1 };
  });
  return newArray;
}

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

  const arrangedIdList = reArrangeIdInList(newTodos);

  saveTodos(arrangedIdList);
  console.log(`Deleted item successfully`);
}

function deleteAllCompletedTasks() {
  const currentList = loadCurrentItems();
  if (currentList.length < 1) {
    console.log("List is empty. Unable to perform operation");
    return;
  }

  const onlyIncompleteTasks = currentList.filter((item) => {
    return item.done === false;
  });

  const arrangedIdList = reArrangeIdInList(onlyIncompleteTasks);

  saveTodos(arrangedIdList);
  console.log("All marked items have been deleted successfully !!!");
}

function markAllTasksComplete() {
  const currentList = loadCurrentItems();
  if (currentList.length < 1) {
    console.log("List is empty. Unable to perform operation");
    return;
  }

  const newList = currentList.map((t) => {
    return { ...t, done: true };
  });

  saveTodos(newList);
  console.log(`All tasks have been marked complete`);
}

function moveAllIncompleteTasksToTop() {
  const currentList = loadCurrentItems();

  if (!currentList.length) {
    console.log("Empty List !!!");
    return;
  }

  const incompleteTasks = currentList.filter((t) => t.done === false);
  const completeTasks = currentList.filter((t) => t.done === true);

  const mergedList = [...incompleteTasks, ...completeTasks];
  const arrangeIdList = reArrangeIdInList(mergedList);

  saveTodos(arrangeIdList);
  console.log(`All incomplete tasks have been moved to the top.`);
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
  case "1":
    deleteAllCompletedTasks();
    break;
  case "2":
    markAllTasksComplete();
    break;
  case "3":
    moveAllIncompleteTasksToTop();
    break;
  default:
    console.log(`
      Available commands: 
      ./todo.js list
      ./todo.js add "Task Name"
      ./todo.js delete <Id>
      ./todo.js mark <Id>
      `);
    console.log(`
        Preset commands(Enter the assigned number to perform operation):
        1. Delete all completed tasks
        2. Mark all tasks as complete
        3. Move all incomplete tasks to the top
        `);
}
