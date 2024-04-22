import './style.css'
import {task, taskList} from './task.js'
import './filter.js'
import dataHandler from './dataHandler.js'
import {updateFilterCount} from './filter.js'


dataHandler.loadData();
updateFilterCount();