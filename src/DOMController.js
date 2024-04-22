import {SVGAssets} from "./assets.js"
import { task, taskList } from "./task.js";

let taskPopup = (function(){
    
    let currentTask = 0;
    let wrapper = document.querySelector("#taskPopup");

    let h3 = document.querySelector("#taskInfoInner > h3");
    let listP = document.querySelector("#taskInfoInner > p");
    let desc = document.querySelector("#taskDesc p");

    let dateCard = document.querySelector("#taskPopupAlarm");
    let dateCardP = document.querySelector("#taskPopupAlarm p");
    let flagCard = document.querySelector("#taskPopupFlag");

    let titleInp = document.querySelector("#taskPopup .h3Inp");
    let descInp = document.querySelector("#taskPopup .pInp");

    function showTaskPopup(eventData, taskData){
        if (eventData && eventData.target.nodeName == "INPUT")
            return;
        
        currentTask = taskData;
        wrapper.classList.remove("hide");
        h3.innerHTML = currentTask.title;
        listP.innerHTML = "In List " + currentTask.parent.name;
        desc.innerHTML = currentTask.desc;

        if (currentTask.date != 0){
            optionDateP.valueAsDate = currentTask.date;
            dateCard.classList.remove("hide");
            dateCardP.innerHTML = "Due At: " + currentTask.date.toLocaleDateString("en-US", {day: 'numeric', month: 'long'});
        }
        else{
            optionDateP.valueAsDate = null;
            dateCard.classList.add("hide");
        }

        if (taskData.important)
            flagCard.classList.remove("hide");
        else
            flagCard.classList.add("hide");
    }

    document.querySelector("#taskPopupOptionsX").addEventListener("click", (event)=>hideTaskPopup(event));
    function hideTaskPopup(){
        wrapper.classList.add("hide");
    }


    let optionEditButt = document.querySelector(".optionsCard:nth-child(3)");
    optionEditButt.addEventListener("click", ()=>{toggleEdit()});
    let editOpen = false;
    function toggleEdit(){
        if (editOpen)
            closeEditTask();
        else
            openEditTask();
    }
    function openEditTask(){
        editOpen = true;
        titleInp.value = currentTask.title;
        descInp.value = currentTask.desc;

        h3.classList.add("hide");
        desc.classList.add("hide");
        titleInp.classList.remove("hide");
        descInp.classList.remove("hide");
    }
    function closeEditTask(){
        editOpen = false;
        h3.classList.remove("hide");
        desc.classList.remove("hide");
        titleInp.classList.add("hide");
        descInp.classList.add("hide");

        currentTask.title = titleInp.value;
        currentTask.desc = descInp.value;
        showTaskPopup(null, currentTask);
        DOMController.updateTask(currentTask);
    }

    
    let optionDateButt = document.querySelector(".optionsCardDate");
    let optionDateP = document.querySelector(".optionsCardDate > input");
    optionDateButt.addEventListener("click", ()=>{openDate()});
    optionDateP.addEventListener("focusout", ()=>updateDate());
    optionDateP.addEventListener("change", ()=>updateDate());
    function openDate(){
        optionDateP.focus()
    }
    function updateDate(){
        if (optionDateP.value != ""){
            currentTask.date = new Date(optionDateP.value);
        }
        else
            currentTask.date = 0;

        showTaskPopup(null, currentTask);
        DOMController.updateTask(currentTask);
    }
    

    let optionFlagButt = document.querySelector(".optionsCard:nth-child(5)");
    optionFlagButt.addEventListener("click", ()=>toggleImportant());
    function toggleImportant(){
        currentTask.important = !currentTask.important;
        showTaskPopup(null, currentTask);
        DOMController.updateTask(currentTask);
    }

    document.querySelector(".optionsCard:nth-child(6)").addEventListener("click",()=>DOMController.deleteTask(currentTask));

    return {showTaskPopup, hideTaskPopup}
})();

let DOMController = (function(){
    
    let content = document.querySelector("#content");

    document.querySelector("#taskHeader .hoverBackround").addEventListener("click", ()=>createNewList());
    function createNewList(){
        let newList = new taskList("");
        startEditList(newList);
    }

    function renderNewList(listData){
        let newList = document.createElement("div");
        newList.classList.add("taskList");

            let listHeader = document.createElement("div");
            listHeader.classList.add("listHeader");

                let pHead = document.createElement("p");
                pHead.innerHTML = listData.name;
                listHeader.appendChild(pHead);

                let h2Inp = document.createElement("input");
                h2Inp.setAttribute("type", "text");
                h2Inp.classList.add("h2Inp", "hide");
                listHeader.appendChild(h2Inp);

                let divHead = document.createElement("div");
                divHead.classList.add("iconHover");
                divHead.innerHTML = SVGAssets.edit;
                listHeader.appendChild(divHead);

                let checkIcon = document.createElement("div");
                checkIcon.classList.add("iconHover", "hide");
                checkIcon.innerHTML = SVGAssets.check;
                listHeader.appendChild(checkIcon);

                let binIcon = document.createElement("div");
                binIcon.classList.add("iconHover", "hide");
                binIcon.innerHTML = SVGAssets.trash;
                listHeader.appendChild(binIcon);

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
        divHead.addEventListener("click", ()=>startEditList(listData));
        checkIcon.addEventListener("click", ()=>endEditList(listData));
        // h2Inp.addEventListener("focusout", ()=>endEditList(listData));
        binIcon.addEventListener("click", ()=>deleteList(listData));

        return newList;
    }

    function startEditList(listData){
        let title = listData.element.querySelector("p");
        let inp = listData.element.querySelector("input");
        let iconWrapper = listData.element.querySelector(".listHeader");

        title.classList.add("hide");
        inp.classList.remove("hide");

        iconWrapper.querySelector(":nth-child(3)").classList.add("hide");
        iconWrapper.querySelector(":nth-child(4)").classList.remove("hide");
        iconWrapper.querySelector(":nth-child(5)").classList.remove("hide");

        inp.value = listData.name;
        inp.focus();
    }

    function endEditList(listData){
        let title = listData.element.querySelector("p");
        let inp = listData.element.querySelector("input");
        let iconWrapper = listData.element.querySelector(".listHeader");

        title.classList.remove("hide");
        inp.classList.add("hide");

        iconWrapper.querySelector(":nth-child(3)").classList.remove("hide");
        iconWrapper.querySelector(":nth-child(4)").classList.add("hide");
        iconWrapper.querySelector(":nth-child(5)").classList.add("hide");

        listData.name = inp.value;
        title.innerHTML = listData.name;
    }

    function deleteList(listData){
        console.log("bruh")
        listData.element.remove();
    }

    function renderNewTask(taskData, parent){
        let wrapper = parent.querySelector(".listContent");

        let newTask = createTaskElement(taskData);

        wrapper.appendChild(newTask);        
        return newTask;
    }

    function updateTask(taskData){
        let wrapper = taskData.parent.element.children[1];

        let newTask = createTaskElement(taskData);

        wrapper.replaceChild(newTask, taskData.element);
        taskData.element = newTask;
    }

    function deleteTask(taskData){
        taskData.deleteTask();
        taskData.element.remove();
        taskPopup.hideTaskPopup();
    }

    function createTaskElement(taskData){
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

                        if (taskData.important){
                            div3.innerHTML += SVGAssets.flag;
                            newTask.classList.add("important");
                        }

                        if (taskData.date != 0){
                            div3.innerHTML += SVGAssets.alarm;

                            let pDate = document.createElement("p");
                            pDate.innerHTML = taskData.date.toLocaleDateString("en-US", {day: 'numeric', month: 'short'});
                            div3.appendChild(pDate);
                            if (taskData.date - new Date())
                                newTask.classList.add("pastDue");
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
                newTask.addEventListener("click", (event)=>taskPopup.showTaskPopup(event, taskData));

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

    return({renderNewList, renderNewTask, updateTask, deleteTask});
})();
export default DOMController;

