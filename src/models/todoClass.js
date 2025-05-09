export class toDo {
    constructor(title, description = '', dueDate = '', priority = 'low', notes = '', completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed;

    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    update({ title, description, dueDate, priority}) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (dueDate) this.DueDate = dueDate;
        if (priority) this.priority = priority;
    }

}