import DOMController from "./DOMController";

export let allTaskLists = [];

export class task{
    constructor(title, parent, desc, date, complete, important){
        this.title = title;
        this.parent = parent;
        this.desc = desc;
        this.date = date;
        this.complete = complete;
        this.important = important;
        this.element = DOMController.renderNewTask(this, parent.element);
    }
    info(){
        return this
    }
    deleteTask(){
        this.parent.deleteTask(this);
    }
}

export class taskList{
    constructor(name, startingObjects = []){
        this.name = name;
        this.tasks = startingObjects;
        this.element = DOMController.renderNewList(this);
        allTaskLists.push(this);
    }

    info(){
        let string = "The tasklist: '" + this.name + "' contains the following tasks: ";
        this.tasks.forEach(e => {
            string += "\n"+e.title;
        });
        return string;
    }

    addTask(title, desc = "", date = 0, complete = false, important = false){
        if (title.replace(/\s+/g, '').length == 0)
            return;
        let newTask = new task(title, this, desc, date, complete, important)
        this.tasks.push(newTask)
    }

    deleteTask(taskData){
        this.tasks.splice(this.tasks.indexOf(taskData), 1)
    }
}