import React from 'react';

type ToDoListHeaderPropsType = {
    title: string
}

const ToDoListHeader = (props: ToDoListHeaderPropsType) => {
    return (
            <h3 className='header'>{props.title}</h3>
    );
};

export default ToDoListHeader;