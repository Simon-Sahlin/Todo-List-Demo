import DOMController from "./DOMController";

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
}

export class taskList{
    constructor(name, startingObjects = []){
        this.name = name;
        this.tasks = startingObjects;
        this.element = DOMController.renderNewList(this);
    }

    getTasks(){
        let string = "The tasklist: '" + this.name + "' contains the following tasks: ";
        this.tasks.forEach(e => {
            string += "\n"+e.title;
        });
        return string;
    }

    addTask(title, desc = "", date = 0, complete = false, important = false){
        if (title == "")
            return;
        let newTask = new task(title, this, desc, date, complete, important)
        this.tasks.push(newTask)
    }
}