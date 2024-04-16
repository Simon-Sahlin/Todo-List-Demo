import './style.css'
import {task, taskList} from './task.js'


let defaultList = new taskList("Default");
defaultList.addTask("Yeet");
defaultList.addTask("UHUHUH", "Descrip");
defaultList.addTask("bro", "Descrip", new Date("December 17, 1995 03:24:00"), false, false);

// console.log(defaultList.getTasks());