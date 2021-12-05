import {combineReducers, createStore} from "redux";
import {taskReducer} from "./Task-Reducer";
import {todoListReducer} from "./TodoList-Reducer";

 let rootReducer=combineReducers({
    tasks:taskReducer,
    todoList:todoListReducer,

})

export type rootReducerType = ReturnType<typeof rootReducer>
export let store=createStore(rootReducer)