import { TodoItem } from './todoItem';
import { TodoCollection } from './todoCollection';
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type schemaType = {
    tasks: {
                id: number;
                task: string;
                complete: boolean;
            }[]
}; // Type schemaType


export class JsonTodoCollection extends TodoCollection {
    
    private database: lowdb.LowdbSync<schemaType>;

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        super(userName, []);
        this.database = lowdb(new FileSync("Todos.json"));
        if (this.database.has("tasks").value()) {
            let dbItems = this.database.get("tasks").value();
            dbItems.forEach(item => this.itemMap.set(item.id,
                new TodoItem(item.id, item.task, item.complete)));
        } else {
            this.database.set("tasks", todoItems).write();
            todoItems.forEach(item => this.itemMap.set(item.id, item));
        } // End of if-else
    } // End of constructor

    addTodo(tasks: string): number {
        let result = super.addTodo(tasks);
        this.storeTasks();
        return result;
    } // End of addTodo()

    markComplete(id: number, complete: boolean): void {
        super.makeComplete(id, complete);
        this.storeTasks();
    } // End of markComplete()

    removeComplete(): void {
        super.removeComplete();
        this.storeTasks();
    } // End of removeComplete()

    private storeTasks() {
        this.database.set("tasks", [...this.itemMap.values()]).write();
    } // End of storeTasks()
} // End of Class JsonTodoCollection