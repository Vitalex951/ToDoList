import React from 'react';
import './ControlButtons.css'
import {FilterValuesType} from "../../App";


type ControlButtonsType = {
    changeFilter: (value: FilterValuesType) => void
}

const ControlButtons = (props: ControlButtonsType) => {
    return (
        <div>
            <button onClick={() => {
                props.changeFilter('all')
            }}>All
            </button>
            <button onClick={() => {
                props.changeFilter('completed')
            }}>Completed
            </button>
            <button onClick={() => {
                props.changeFilter('active')
            }}>Active
            </button>
        </div>
    );

};
export default ControlButtons;