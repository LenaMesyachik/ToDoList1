import {v1} from "uuid";

export const todoListID1 = v1()
export const todoListID2 = v1()
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed"

let initialState:Array<TodoListType>=[
    {id: todoListID1, title: 'What to learn', filter: 'completed'},
    {id: todoListID2, title: 'What to buy', filter: 'active'},
]
export const todoListReducer=(state:Array<TodoListType>=initialState, action:ActionsType):Array<TodoListType>=>{
    switch (action.type) {
        case "REMOVE-TODOLIST":
            console.log("REMOVE-TODOLIST")
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            console.log('ADD-TODOLIST')
              const newTodoList: TodoListType = {
            id:action.id,
            title:action.title,
            filter: 'all'
        }
        return [...state,newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state.map(tl => tl.id === action.id? {...tl, title:action.title} : tl) ]
        case "CHANGE-TODOLIST-FILTER":
            return [...state.map(tl => tl.id === action.id? {...tl, filter:action.filter} : tl) ]


        default:return state
    }
}

export type ActionsType = removeTodoListACType |  addTodoListACType | changeTodoListTitleACType | changeTodoListFilterACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC > //автоматически возвращает тип экшена
export const removeTodoListAC = (TodoListID:string)=>({type:'REMOVE-TODOLIST',id:TodoListID} as const)

export type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC=(id:string, title:string)=>({type:'ADD-TODOLIST',id:id, title:title} as const)

export type changeTodoListTitleACType =ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC=(id:string,title:string)=>({type:'CHANGE-TODOLIST-TITLE', title:title, id:id} as const)

export type changeTodoListFilterACType =ReturnType<typeof changeTodoListFilterAC>
export const changeTodoListFilterAC=(id:string,filter:FilterValuesType)=>({type:'CHANGE-TODOLIST-FILTER', filter, id} as const)
