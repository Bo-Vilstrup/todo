"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        // No statement required
    }
    addTodo(task) {
        while (this.getTodoById(this.nextId)) { // How many todoItams are there in the collection
            this.nextId++;
        } // End of while()
        this.todoItems.push(new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    } // End of addTodo
    getTodoById(id) {
        return this.todoItems.find(item => item.id === id);
    } // getTodoById
    makeComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        } // if()
    } // makeComplete
} // End of Class
exports.TodoCollection = TodoCollection;
