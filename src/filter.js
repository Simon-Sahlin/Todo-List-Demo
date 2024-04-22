import { allTaskLists } from "./task";

let wrapper = document.querySelector("#filterWrapper");
let filters = Array.from(wrapper.querySelectorAll(".filter"));
let filterNums = []

filters.forEach(element => {
    element.addEventListener("click", ()=>changeFilter(element))
    filterNums.push(element.querySelector(".filterCount"))
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

export function updateFilterCount(){
    filterNums.forEach((p,i) => {
        let count = 0;

        allTaskLists.forEach(list => {
            list.tasks.forEach(task => {
                if (filterFuncs[i](task) && !task.complete)
                    count++;
            });
        });

        p.innerHTML = count;
    });
}

function filter0(task){
    return (task.date != 0 && task.date - new Date() < 1000*60*60*24);
}
function filter1(task){
    return (task.date != 0 && task.date - new Date() < 1000*60*60*24*8);
}
function filter2(task){
    return (true);
}
function filter3(task){
    return (task.important);
}

let filterFuncs = [filter0,filter1,filter2,filter3];