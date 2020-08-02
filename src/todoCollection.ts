import { TodoItem } from './todoItem';


export class TodoCollection {
    private nextId: number = 1;
    private itemMap = new Map<number, TodoItem>();

    constructor(
        public userName: string,
        public todoItems: TodoItem[] = []
    ) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    } // End of constructor

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) { // How many todoItems are there in the collection
            this.nextId++;
        } // End of while()
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    } // End of addTodo

    getTodoById(id: number): TodoItem {
        return this.itemMap.get(id);
    } // getTodoById

    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete);
    };

    makeComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if(todoItem) {
            todoItem.complete = complete;
        } // if()
    } // makeComplete

} // End of Class