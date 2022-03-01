import React from 'react';

type ButtonPropsType = {
    name: string
    callback: () => void
    classname: string
}

export const Button = (props: ButtonPropsType) => {
    const onClickButtonHeader = () => {
        props.callback()
    }
    return (
        <button className={props.classname}
                onClick={onClickButtonHeader}>{props.name}</button>
    );
};
