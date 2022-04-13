import React, {useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";

type ToDoListHeaderPropsType = {
    title: string
    updateToDoList:(title:string) => void
}

const ToDoListHeader = React.memo((props: ToDoListHeaderPropsType) => {
    console.log('ToDoListHeader')
    const updateToDoList = useCallback((title:string) => {
        props.updateToDoList(title)
    }, [props.updateToDoList])
    return (
            <h3 className='header'>
                <EditableSpan oldTitle={props.title} callback={updateToDoList}/>
            </h3>
    );
});

export default ToDoListHeader;