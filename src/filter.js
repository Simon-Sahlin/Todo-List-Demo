import DOMController from "./DOMController";
import { task } from "./task";

let wrapper = document.querySelector("#filterWrapper");
let filters = Array.from(wrapper.querySelectorAll(".filter"));

let lists = []

export default function addList(list){
    lists.push(list);
}

filters.forEach(element => {
    element.addEventListener("click", ()=>changeFilter(element))
});

function changeFilter(element){ 
    filters.forEach(e => {
        e.classList.remove("selected");
    });   
    element.classList.add("selected");
    let filterIndex = filters.indexOf(element);

    let newLists = [];

    switch (filterIndex) {
        case 0:
            lists.forEach(list => {
                let renderList = false;
                list.tasks.forEach(task => {
                    if (task.date != 0 && task.date - new Date() < 1000*60*60*24){
                        task.element.classList.remove("hide");
                        renderList = true;
                    }
                    else
                        task.element.classList.add("hide");
                });
                if (renderList)
                    list.element.classList.remove("hide");
                else
                    list.element.classList.add("hide");
            });
            break;

        case 1:
            lists.forEach(list => {
                let renderList = false;
                list.tasks.forEach(task => {
                    if (task.date != 0 && task.date - new Date() < 1000*60*60*24*8){
                        task.element.classList.remove("hide");
                        renderList = true;
                    }
                    else
                        task.element.classList.add("hide");
                });
                if (renderList)
                    list.element.classList.remove("hide");
                else
                    list.element.classList.add("hide");
            });
            break;

        case 2:
            lists.forEach(list => {
                list.element.classList.remove("hide");
                list.tasks.forEach(task => {
                    task.element.classList.remove("hide");
                });
            });
            break;

        case 3:
            lists.forEach(list => {
                let renderList = false;
                list.tasks.forEach(task => {
                    if (task.important){
                        task.element.classList.remove("hide");
                        renderList = true;
                    }
                    else
                        task.element.classList.add("hide");
                });
                if (renderList)
                    list.element.classList.remove("hide");
                else
                    list.element.classList.add("hide");
            });
            break;
    }
}