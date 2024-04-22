import { allTaskLists } from "./task";

let wrapper = document.querySelector("#filterWrapper");
let filters = Array.from(wrapper.querySelectorAll(".filter"));

filters.forEach(element => {
    element.addEventListener("click", ()=>changeFilter(element))
});

function changeFilter(element){ 
    filters.forEach(e => {
        e.classList.remove("selected");
    });   
    element.classList.add("selected");
    let filterIndex = filters.indexOf(element);

    switch (filterIndex) {
        case 0:
            allTaskLists.forEach(list => {
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
            allTaskLists.forEach(list => {
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
            allTaskLists.forEach(list => {
                list.element.classList.remove("hide");
                list.tasks.forEach(task => {
                    task.element.classList.remove("hide");
                });
            });
            break;

        case 3:
            allTaskLists.forEach(list => {
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