import React, {useCallback} from 'react';
import './ControlButtons.css'
import {FilterValuesType} from "../../app/App";
import {Button} from "@material-ui/core";


type ControlButtonsType = {
    todoListID: string
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    filter: FilterValuesType
}

export const ControlButtons =React.memo( (props: ControlButtonsType) => {
        const onClickButtonChangeFilter = useCallback((filter: FilterValuesType) => {
            return () => props.changeFilter(props.todoListID, filter)
        }, [props.changeFilter, props.todoListID])

        return (
            <div className={"button_filter"}>
                <Button variant={props.filter === "all" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('all')}>
                    All
                </Button>
                <Button variant={props.filter === "active" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('active')}>
                Active
                </Button>
                <Button variant={props.filter === "completed" ? 'contained' : 'text'} size="small" onClick={onClickButtonChangeFilter('completed')}>
                    Completed
                </Button>
                {/*<ButtonMy name={"All"}*/}
                {/*          callback={onClickButtonChangeFilter('all')}*/}
                {/*          classname={classButtonAll}/>*/}
                {/*<ButtonMy name={'Completed'}*/}
                {/*          callback={onClickButtonChangeFilter('completed')}*/}
                {/*          classname={classButtonCompleted}/>*/}
                {/*<ButtonMy name={'Active'}*/}
                {/*          callback={onClickButtonChangeFilter('active')}*/}
                {/*          classname={classButtonActive}/>*/}

            </div>
        );

    });
