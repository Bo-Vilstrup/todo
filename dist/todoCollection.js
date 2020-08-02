"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
class TodoCollection {
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    } // End of constructor
    addTodo(task) {
        while (this.getTodoById(this.nextId)) { // How many todoItems are there in the collection
            this.nextId++;
        } // End of while()
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    } // End of addTodo
    getTodoById(id) {
        return this.itemMap.get(id);
    } // getTodoById
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete);
    }
    ;
    makeComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        } // if()
    } // makeComplete
} // End of Class
exports.TodoCollection = TodoCollection;
