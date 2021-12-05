import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC,
    TodoListType
} from "./store/TodoList-Reducer";
import {
    addArrayTaskAC,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType
} from "./store/Task-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducerType} from "./store/store";

/*export type FilterValuesType = "all" | "active" | "completed"*/
/*export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}*/
/*
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
*/


function App() {

    //BUSINESS-LOGIC-ДАННЫЕ
  /*  const todoListID1 = v1()
    const todoListID2 = v1()*/

/*    const [todoLists, dispatchTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'completed'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ])*/
    /*  const [tasks, dispatchTasks] = useReducer(taskReducer,{
          [todoListID1]:
              [{id: v1(), title: "CSS", isDone: true},
                  {id: v1(), title: "JS", isDone: true},
                  {id: v1(), title: "REACT", isDone: false},
                  {id: v1(), title: "REDUX", isDone: false}],
          [todoListID2]:
              [{id: v1(), title: "milk", isDone: true},
                  {id: v1(), title: "book", isDone: true},
                  {id: v1(), title: "cheese", isDone: false}]

      })*/

    let dispatch = useDispatch()
    let todoLists = useSelector<rootReducerType, Array<TodoListType>>(state => state.todoList)
    let tasks = useSelector<rootReducerType, TasksStateType>(state => state.tasks)

    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
        /* tasks[todoListID] = tasks[todoListID].filter(task => task.id !== taskID)
         setTasks({...tasks}) *///реакт смотрит только повехностую копию, пэтому без копии не перерисует, фильтр возвращает новый массив, сделав его из копии исходного
    }
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
        /* const newTask: TaskType = {
             id: v1(),
             title: title,
             isDone: true
         }
         setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})*/
    }
    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
        /*setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        })*/
    }
    const changeStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
        /*setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        })*/
    }


    const changeTodoListTitle = (title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
        /* setTodoLists(todoLists.map(tl => {

             return tl.id === todoListID ? {...tl, title} : tl
         }))*/
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, filter))
        /* setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))*/
    }
    const removeTodoList = (todoListID: string) => {
        /*   setTodoLists(todoLists.filter(tl => tl.id !== todoListID))*/
        /*  delete tasks[todoListID]*/
        dispatch(removeTodoListAC(todoListID))
    }
    const addTodoList = (title: string) => {
        const todoListID = v1()
        dispatch(addTodoListAC(todoListID, title))
        dispatch(addArrayTaskAC(todoListID))
        /*/!*    const newTodoList: TodoListType = {
                id: todoListID,
                title,
                filter: 'all'
            }
            setTodoLists([...todoLists, newTodoList])*!/
            setTasks({...tasks, [todoListID]: []})*/
    }





// UI - ИНТЕРФЕЙС


    const todoListsComponents = todoLists.map((tl ) => {
            let tasksForRender: Array<TaskType> = tasks[tl.id];
            if (tl.filter === "active") {
                tasksForRender = tasks[tl.id].filter(t => t.isDone !== true)
            }
            if (tl.filter === "completed") {
                tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
            }

            return (
                <Grid item key={tl.id}>
                    <Paper elevation={1} style={{padding: '20px'}}>
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            filter={tl.filter}
                            title={tl.title}
                            tasks={tasksForRender}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodoList={removeTodoList}
                            addTodoList={addTodoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '29px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
            </Container>
            <Grid container spacing={8}>
                {todoListsComponents}
            </Grid>
        </div>
    );
}


export default App;

