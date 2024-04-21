import './style.css'
import {task, taskList} from './task.js'


let defaultList = new taskList("Default");
defaultList.addTask("Yeet");
defaultList.addTask("UHUHUH", "Descrip");
defaultList.addTask("bro", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed officiis, inventore ab omnis voluptates architecto possimus dicta, excepturi perspiciatis quas odit optio dolorum illo minima delectus laborum fuga eveniet autem natus nostrum quia dolores accusamus? Pariatur laborum aperiam quis, dolores iure autem nesciunt!", new Date("December 17, 1995 03:24:00"), false, false);

// console.log(defaultList.getTasks());