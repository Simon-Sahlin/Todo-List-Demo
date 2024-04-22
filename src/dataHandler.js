import {taskList, allTaskLists, task} from './task.js'
import {updateFilterCount} from './filter.js'

let dataHandler = (function(){

    function loadData(){
        console.log("Loading Data...");
        let loadedData = getItem("data", 0);
        if (loadedData == 0){
            loadDefaultData();
            return;
        }
        let parsedData = JSON.parse(loadedData);

        parsedData.forEach(listData => {
            let list = new taskList(listData.name)
            listData.tasks.forEach(taskData => {
                list.addTask(taskData.title, taskData.desc, taskData.date ? new Date(taskData.date) : 0, taskData.complete, taskData.important);
            });
        });

        console.log("Done Loading Data!");
    }


    function loadDefaultData(){
        console.log("Loading Default Data...")

        let defaultList = new taskList("Example List - Chores");
        defaultList.addTask("Do the dishes");
        defaultList.addTask("Vacuum", "Its very important that you vacuum the basement, it hasn't been done in a while. You don't need to vacuum the living room.");
        defaultList.addTask("Buy groceries", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed officiis, inventore ab omnis voluptates architecto possimus dicta, excepturi perspiciatis quas odit optio dolorum illo minima delectus laborum fuga eveniet autem natus nostrum quia dolores accusamus? Pariatur laborum aperiam quis, dolores iure autem nesciunt!", 0, false, true);
        defaultList.addTask("Write shopping list", "", 0, true, false);
        

        let anotherList = new taskList("Example List - Work")
        anotherList.addTask("Super Important report!!", "", 0, false, true)
        anotherList.addTask("Send Emails", "", new Date(), true, true)
        anotherList.addTask("To be done today!", "", new Date(), false, false)
        let today = new Date();
        anotherList.addTask("To be done this week!", "", new Date(today.getFullYear(), today.getMonth(), today.getDate()+7), false, false)
        anotherList.addTask("Had to be done yesterday!!", "", new Date(today.getFullYear(), today.getMonth(), today.getDate()-1), false, false)
        anotherList.addTask("Buy Supplies", "", new Date(today.getFullYear(), today.getMonth()-1, today.getDate()-2), true, true)

        console.log("Done Loading Default Data!");
    }


    function loadDebugData(){
        console.log("Loading Debug Data...")

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

        console.log("Done Loading Debug Data!");
    }


    function saveData(){
        updateFilterCount();
        console.log("Saving Data...");
        let simplyfiedData = []

        allTaskLists.forEach(listData => {
            let newList = {};
            newList.name = listData.name;
            newList.tasks = [];

            listData.tasks.forEach(taskData => {
                let newTask = {};

                newTask.title = taskData.title;
                newTask.desc = taskData.desc;
                newTask.date = taskData.date;
                newTask.complete = taskData.complete;
                newTask.important = taskData.important;

                newList.tasks.push(newTask);
            });

            simplyfiedData.push(newList);
        });

        setItem("data", JSON.stringify(simplyfiedData))
        console.log("Done Saving Data!");
    }

    function getItem(name, _default = null){
        let val = localStorage.getItem(name);
        return (val? val : _default);
    }

    function setItem(name, value){
        localStorage.setItem(name, value);
    }

    return({loadData, saveData});
})();
export default dataHandler;