import urgent from './Assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import highPriority from './Assets/icons_FEtask/Img - High Priority.svg'
import lowPriority from './Assets/icons_FEtask/Img - Low Priority.svg'
import mediumPriority from './Assets/icons_FEtask/Img - Medium Priority.svg'
import noPriority from './Assets/icons_FEtask/No-priority.svg'
import cancelled from './Assets/icons_FEtask/Cancelled.svg'
import done from './Assets/icons_FEtask/Done.svg'
import inProgress from './Assets/icons_FEtask/in-progress.svg'
import toDo from './Assets/icons_FEtask/To-do.svg'
import backlog from './Assets/icons_FEtask/Backlog.svg'

export const getPriorityIcon = (priority) => {
    switch (priority) {
        case "No priority": return <img src = {noPriority} alt="icon"></img>
        case "Low": return <img src = {lowPriority} alt="icon"></img>
        case "Medium": return <img src = {mediumPriority} alt="icon"></img>
        case "High": return <img src = {highPriority} alt="icon"></img>
        case "Urgent": return <img src = {urgent} alt="icon"></img>
        default: return <img src = {noPriority} alt="icon"></img>
    }
}

export const getStatusIcon = (priority) => {
    switch (priority) {
        case "Backlog": return <img src = {backlog} alt="icon"></img>
        case "Todo": return <img src = {toDo} alt="icon"></img>
        case "In progress": return <img src = {inProgress} alt="icon"></img>
        case "Done": return <img src = {done} alt="icon"></img>
        case "Canceled": return <img src = {cancelled} alt="icon"></img>
        default: return <img src = {backlog} alt="icon"></img>
    }
}