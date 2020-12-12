import React from "react"

export const TextInput = (props) => {
    return (
        <fieldset className="textinput">
            <label {...props} className="textinput__label">{props.label}:</label>
            <input type="text" {...props} className="textinput__input"/>
        </fieldset> 
    )
}