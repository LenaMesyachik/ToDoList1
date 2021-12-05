import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {todoListID1, todoListID2} from "./TodoList-Reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


let initialState:TasksStateType={
    [todoListID1]:
    [{id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}],
        [todoListID2]:
    [{id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "book", isDone: true},
        {id: v1(), title: "cheese", isDone: false}]

}


export const taskReducer = (state: TasksStateType=initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter
                (t => t.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: true
            }
            return {
                ...state,
                [action.todoListID]: [newTask,...state[action.todoListID]]
            }
        }
        case  'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID
                    ? {...t, title:action.title} : t)
            }
        }
        case  'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID
                    ? {...t, isDone:action.isDone} : t)
            }
        }
        case  "ADD-ARRAY-TASK": {
            return {
                ...state,
                [action.todoListID]: []
            }
        }

        default:
            return state
    }
}


export type ActionsType = removeTaskACType | addTaskACType | changeTaskTitleACType |changeTaskStatusACType | addArrayTaskType


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todoListID: string) => ({
    type: 'REMOVE-TASK',
    taskID,
    todoListID
} as const)

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todoListID: string) => ({
    type: 'ADD-TASK',
    title,
    todoListID
} as const)

export type  changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => ({
    type: 'CHANGE-TASK-TITLE',
    title,
    todoListID,
    taskID
} as const)
export type  changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskID: string, isDone:boolean , todoListID: string) => ({
    type: 'CHANGE-TASK-STATUS',
    isDone,
    todoListID,
    taskID
} as const)

export type addArrayTaskType=ReturnType<typeof addArrayTaskAC>
export const addArrayTaskAC=(todoListID: string)=>({type:"ADD-ARRAY-TASK",todoListID}as const)


