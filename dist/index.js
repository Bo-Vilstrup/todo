"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonTodoCollection_1 = require("./jsonTodoCollection");
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Flowers"),
    new todoItem_1.TodoItem(2, "Get Shoes"),
    new todoItem_1.TodoItem(3, "Collect Tickets"),
    new todoItem_1.TodoItem(4, "Call joe", true)
];
// let collection: TodoCollection = new TodoCollection("Adam", todos);
let collection = new jsonTodoCollection_1.JsonTodoCollection("Adam", todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`${collection.userName}'s Todo List `
        + `(${collection.getItemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add New Task";
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "show/Hide completed";
    Commands["Purge"] = "Remove Completed Tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
    console.clear;
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter task:"
    }).then(answers => {
        if (answers["add"] != "") {
            collection.addTodo(answers["add"]);
        }
        promptUser();
    });
} // End for promptAdd()
function promptComplete() {
    console.clear;
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "Mark Tasks Complete",
        choices: collection.getTodoItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    }).then(answers => {
        let completedTasks = answers["complete"];
        collection.getTodoItems(true).forEach(item => collection.makeComplete(item.id, completedTasks.find(id => id === item.id) != undefined));
        promptUser();
    });
} // End of function promptComplete()
function promptUser() {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Choose option",
        choices: Object.values(Commands)
        //badProperty: true
    }).then(answers => {
        switch (answers["command"]) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if (collection.getItemCounts().incomplete > 0) {
                    promptComplete();
                }
                else {
                    promptUser();
                }
                break;
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        } // End of switch()
    });
} // End of function promptUser()
promptUser();
// console.log(`${collection.userName}'s Todo List ` + `(${ collection.getItemCounts().imcomplete } items to do)`);
// collection.getTodoItems(true).forEach(item => item.printDetails());
