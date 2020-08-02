"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
console.clear();
console.log("Adam's Todo list");
let todoItem = new todoItem_1.TodoItem(1, "shit and lageredsfdsfdcake", false);
todoItem.printDetails();
