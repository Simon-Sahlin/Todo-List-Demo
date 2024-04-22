import './style.css'
import {task, taskList} from './task.js'
import './filter.js'


let defaultList = new taskList("Default");
defaultList.addTask("Yeet");
defaultList.addTask("UHUHUH", "Descrip");
defaultList.addTask("bro", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed officiis, inventore ab omnis voluptates architecto possimus dicta, excepturi perspiciatis quas odit optio dolorum illo minima delectus laborum fuga eveniet autem natus nostrum quia dolores accusamus? Pariatur laborum aperiam quis, dolores iure autem nesciunt!", new Date("January 17, 1995 03:24:00"), false, false);

let anotherList = new taskList("Another one")
anotherList.addTask("I'm Important!", "", 0, false, true)
anotherList.addTask("doon!", "", new Date(), true, true)
anotherList.addTask("be done today!", "", new Date(), false, false)
let today = new Date();
anotherList.addTask("be done this week!", "", new Date(today.getFullYear(), today.getMonth(), today.getDate()+7), false, false)