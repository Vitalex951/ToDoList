import React from 'react';
import './ControlButtons.css'
import {FilterValueType} from "../../App";
type ControlButtonsType =  {
    id: number
    changeFilter: (filter: FilterValueType) => void
}

const ControlButtons = (props: ControlButtonsType) => {
    return (
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')>Active</button>
            <button onClick={() => props.changeFilter('completed')>Completed</button>
        </div>
    );

};
export default ControlButtons;