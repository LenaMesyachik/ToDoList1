import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditSpan} from "./EditSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./store/TodoList-Reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type toDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void //func
    changeFilter: (filter: FilterValuesType, todoListID: string) => void //func
    addTask: (title: string, todoListID: string) => void
    id: string
    filter: FilterValuesType
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    addTodoList: (title: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


export function TodoList(props: toDoListPropsType) {
    /*const [title, setTitle] = useState<string>('')*/
    const tasksJSXElements = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return <ListItem
            disableGutters
            className={t.isDone ? 'is-Done' : ''}
            divider
            key={t.id}
        style={{
            display:"flex",
            padding:'0px',
            justifyContent:'space-between'
        }}>
            <Checkbox
                color={'primary'}
                onChange={changeTaskStatus}
                checked={t.isDone}/>
            <EditSpan title={t.title} setNewTitle={changeTitle}/>
            <IconButton
                onClick={removeTask}
            >
                <Delete fontSize={"small"}/>
            </IconButton>

        </ListItem>
    })
    /*       отрисовка ли для каждоой таски массива таскс <Array<TaskType>>, данные которых нам передала арр через пропсы PropsType*/

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {
        console.log(title)
        console.log(props.id)
        props.changeTodoListTitle(title, props.id)
    }


    const setAll = () => props.changeFilter('all', props.id)
    const setActive = () => props.changeFilter('active', props.id)
    const setCompleted = () => props.changeFilter('completed', props.id)
    /* const allButtonClass = props.filter === 'all' ? 'active-filter' : ''
     const activeButtonClass = props.filter === 'active' ? 'active-filter' : ''
     const completedButtonClass = props.filter === 'completed' ? 'active-filter' : ''*/
    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }
    return (
        <div className='todoList'>
            <Typography variant={"h6"} style={{fontWeight: 'bold'}}>
                <EditSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                {/* <h3>{props.title}</h3>*/}
                <IconButton
                    onClick={removeTodoListHandler}>
                    <Delete/>
                </IconButton>
            </Typography>
            {/* <button onClick={removeTodoListHandler}>x</button>*/}
            <AddItemForm addItem={addTask}/>
            { /*<div>
                <input
                    value={title}
                    placeholder='Enter your task...'
                    onChange={event => setTitle(event.currentTarget.value)}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            addTask()
                        }
                    }}
                />
                <button onClick={addTask}>+</button>
            </div>*/}

                <List>
                    {tasksJSXElements} {/*//раньше тут был статичный список ли, где описываля каждый элемент массива таскs*/}
                </List>

            <div>
                <ButtonGroup
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                /*    style={{
                        display:'flex',
                        justifyContent: "space-between"
                    }}*/
                >
                    <Button color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={setAll}>All</Button>
                    <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                            onClick={setActive}>Active</Button>
                    <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                            onClick={setCompleted}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

