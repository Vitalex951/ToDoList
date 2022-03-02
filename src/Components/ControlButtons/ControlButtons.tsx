import React from 'react';
import './ControlButtons.css'
import {FilterValuesType} from "../../App";
import {Button} from "../Button/Button";


type ControlButtonsType = {
    todoListID: string
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    filter: FilterValuesType
}

const ControlButtons = (props: ControlButtonsType) => {
        const onClickButtonChangeFilter = (filter: FilterValuesType) => {
            return () => props.changeFilter(props.todoListID, filter)
        }

        const classButtonAll = (props.filter === "all" ? 'button active-filter' : 'button')
        const classButtonCompleted = (props.filter === "completed" ? 'button active-filter' : 'button')
        const classButtonActive = (props.filter === "active" ? 'button active-filter' : 'button')
        return (
            <div className={"button_filter"}>

                <Button name={"All"}
                        callback={onClickButtonChangeFilter('all')}
                        classname={classButtonAll}/>
                <Button name={'Completed'}
                        callback={onClickButtonChangeFilter('completed')}
                        classname={classButtonCompleted}/>
                <Button name={'Active'}
                        callback={onClickButtonChangeFilter('active')}
                        classname={classButtonActive}/>

            </div>
        );

    }
;
export default ControlButtons;