import React from 'react';
import './ControlButtons.css'
import {FilterValuesType} from "../../App";


type ControlButtonsType = {
    changeFilter: (value: FilterValuesType) => void
    filter: FilterValuesType
}

const ControlButtons = (props: ControlButtonsType) => {
        const onClickButtonChangeFilter = (filter: FilterValuesType) => {
            return () => props.changeFilter(filter)
        }

        let classButtonAll = (props.filter === "all" ? 'active-filter' : '')
        let classButtonCompleted = (props.filter === "completed" ? 'active-filter' : '')
        let classButtonActive = (props.filter === "active" ? 'active-filter' : '')
        return (
            <div>
                <button
                    className={classButtonAll}
                    onClick={onClickButtonChangeFilter('all')}>
                    All
                </button>
                <button
                    className={classButtonCompleted}
                    onClick={onClickButtonChangeFilter('completed')}>
                    Completed
                </button>
                <button
                    className={classButtonActive}
                    onClick={onClickButtonChangeFilter('active')}>
                    Active
                </button>
            </div>
        );

    }
;
export default ControlButtons;