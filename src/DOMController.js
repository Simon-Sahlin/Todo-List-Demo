import {SVGAssets} from "./assets.js"
import { task, taskList } from "./task.js";

let DOMController = (function(){
    
    let content = document.querySelector("#content");

    function renderNewList(listData){
        let newList = document.createElement("div");
        newList.classList.add("taskList");

            let listHeader = document.createElement("div");
            listHeader.classList.add("listHeader");

                let pHead = document.createElement("p");
                pHead.innerHTML = listData.name;
                listHeader.appendChild(pHead);

                let divHead = document.createElement("div");
                divHead.classList.add("iconHover");
                divHead.innerHTML = SVGAssets.edit;
                listHeader.appendChild(divHead);

            newList.appendChild(listHeader);

            let listContent = document.createElement("div");
            listContent.classList.add("listContent");
            //Create Task items
            newList.appendChild(listContent);

            let footerForm = document.createElement("div");
            footerForm.classList.add("footerForm", "hidden");

                let textarea = document.createElement("textarea")
                textarea.classList.add("text")
                textarea.setAttribute("placeholder", "Enter a title for this task...")
                footerForm.appendChild(textarea);

                let btn = document.createElement("input");
                btn.classList.add("submit")
                btn.setAttribute("type","button");
                btn.setAttribute("value","Add Task");
                footerForm.appendChild(btn);

            newList.appendChild(footerForm);

            let listFooter = document.createElement("div");
            listFooter.classList.add("listFooter", "hoverBackround");
            
                listFooter.innerHTML = SVGAssets.plus;

                let pFot = document.createElement("p");
                pFot.innerHTML = "New Task";
                listFooter.appendChild(pFot);

            newList.appendChild(listFooter);

        content.appendChild(newList);

        listFooter.addEventListener("click", ()=>openNewTaskForm(listData));
        textarea.addEventListener("focusout", ()=>submitNewTaskForm(textarea.value, listData));

        return newList;
    }

    function renderNewTask(taskData, parent){
        let wrapper = parent.querySelector(".listContent");

            let newTask = document.createElement("div");
            newTask.classList.add("task");

                let div1 = document.createElement("div");
                div1.classList.add("taskCheck");

                    let checkbox = document.createElement("input");
                    checkbox.setAttribute("type", "checkbox")
                    div1.appendChild(checkbox);

                newTask.appendChild(div1);

                let div2 = document.createElement("div");
                div2.classList.add("taskContent");

                    let p = document.createElement("p");
                    p.innerHTML = taskData.title;
                    div2.appendChild(p);

                    let div3 = document.createElement("div");
                    div3.classList.add("taskIcons");
                    div3.classList.add("taskContent");

                        if (taskData.desc != "")
                            div3.innerHTML = SVGAssets.list;

                        if (taskData.date != 0){
                            div3.innerHTML += SVGAssets.alarm;

                            let pDate = document.createElement("p");
                            pDate.innerHTML = taskData.date.toLocaleDateString("en-US", {day: 'numeric', month: 'short'});
                            div3.appendChild(pDate);
                        }

                    div2.appendChild(div3);

                newTask.appendChild(div2);

                let div4 = document.createElement("div");
                div4.classList.add("taskEdit");

                    let div5 = document.createElement("div");
                    div5.classList.add("iconHover");
                    div5.innerHTML = SVGAssets.edit;
                    div4.appendChild(div5);

                newTask.appendChild(div4);

            wrapper.appendChild(newTask);
        return newTask;
    }
    
    function openNewTaskForm(listData){
        let e = listData.element;
        e.querySelector(".footerForm").classList.remove("hidden");
        e.querySelector(".listFooter").classList.add("hidden");
        e.querySelector("textarea").focus()
    }

    function submitNewTaskForm(title, listData){
        let e = listData.element;
        e.querySelector("textarea").value = "";
        e.querySelector(".footerForm").classList.add("hidden");
        e.querySelector(".listFooter").classList.remove("hidden");
        listData.addTask(title);
    }

    return({renderNewList, renderNewTask});
})();
export default DOMController;

