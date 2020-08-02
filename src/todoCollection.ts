import { TodoItem } from './todoItem';
export class TodoCollection {
    private nextId: number = 1;

    constructor(
        public userName: string,
        public todoItems: TodoItem[] = []
    ) {
        // No statement required
    }

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) { // How many todoItams are there in the collection
            this.nextId++;
        } // End of while()
        this.todoItems.push(new TodoItem(this.nextId, task));
        return this.nextId;
    } // End of addTodo

    getTodoById(id: number): TodoItem {
        return this.todoItems.find(item => item.id === id);
    } // getTodoById

    makeComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if(todoItem) {
            todoItem.complete = complete;
        } // if()
    } // makeComplete

} // End of Class