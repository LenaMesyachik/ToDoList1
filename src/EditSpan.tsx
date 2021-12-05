import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}


export const EditSpan = (props: EditSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(true)
    const [title, setTitle] = useState<string>(props.title)
    const ChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
        if (props.title) {
            props.setNewTitle(title)
             
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        debugger
        props.setNewTitle(title)
    }

    return (

        editMode
            ? <TextField
                size={'small'}
                value={title} onBlur={offEditMode} autoFocus onChange={ChangeTitle}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
