import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {

    const errorStyles = {backgroundColor: 'red', color: 'white', fontWeight: 900}
    const errorInputStyles = {border: '2px solid red', outline: 'none'}
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const ChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(event.currentTarget.value)
    }
    const errorMessage = error && <div style={errorStyles}>Title is required!</div>
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addItem(title)
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
            setTitle('')
        }
    }
    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                style={error ? errorInputStyles : undefined}
                value={title}
                label={'Title'}
                placeholder='Enter title...'
                onChange={ChangeTitle}
                onKeyPress={onKeyPressHandler}
                error={error}
                helperText={errorMessage}

            />
            <IconButton
                onClick={addItem}
                color={"primary"}
                size={"small"}>
                <AddBox fontSize={'large'}/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    )
}
