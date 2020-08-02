export class TodoItem {
    
    public constructor(
        public id: number,
        public task: string,
        public complete: boolean = false) {
        // No statements required
    }

    public printDetails() : void {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)": ""}`);
    } // End of printDetail()
} // End of class TodoItem