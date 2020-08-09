import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import * as inquirer from 'inquirer';

let todos = [
    new TodoItem(1, "Buy Flowers"),
    new TodoItem(2, "Get Shoes"),
    new TodoItem(3, "Collect Tickets"),
    new TodoItem(4, "Call joe", true)
];

let collection: TodoCollection = new TodoCollection("Adam", todos);
let showCompleted = true;
    
function displayTodoList() : void {
    console.log(`${collection.userName}'s Todo List `
        + `(${ collection.getItemCounts().imcomplete } items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}

enum Commands {
    Add = "Add New Task",
    Toggle = "show/Hide completed",
    Quit = "Quit"
}

function promptAdd(): void {
    console.clear;
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Enter task:"
    }).then(answers => {if (answers["add"] != "") { 
            collection.addTodo(answers["add"]);
        }
        promptUser();
    })
} // End for promptAdd()

function promptUser(): void {
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
        } // End of switch()
    })
} // End of function promptUser()

promptUser();

// console.log(`${collection.userName}'s Todo List ` + `(${ collection.getItemCounts().imcomplete } items to do)`);
// collection.getTodoItems(true).forEach(item => item.printDetails());