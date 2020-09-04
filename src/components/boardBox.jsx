import React from 'react'

export default function Box(props) {
    return (
        <div className={`boardBox ${props.value}`} onClick={props.onClick}></div>
    )
}