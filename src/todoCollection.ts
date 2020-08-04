import { TodoItem } from './todoItem';

type ItemCounts = {
    total: number,
    imcomplete: number
}


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

    getTodoItems(includeComplete: boolean): TodoItem[] { // include completed tasks ? if includeComplete = true - then yes
        return [...this.itemMap.values()]
            .filter(item => includeComplete || !item.complete);
    };

    makeComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if(todoItem) {
            todoItem.complete = complete;
        } // if()
    } // makeComplete

    removeComplete() {
        this.itemMap.forEach(item => {
            if(item.complete) {
                this.itemMap.delete(item.id);
            }
        })
    } // End of removeComplete()

    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            imcomplete: this.getTodoItems(false).length
        };
    }

} // End of Class