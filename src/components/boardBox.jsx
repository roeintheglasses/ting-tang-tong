import React from 'react'

export default function Box(props) {
    return (
        <button className="boardBox" onClick={props.onClick}>
            {props.value}
        </button>
    )
}