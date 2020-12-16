import React from 'react'
import Button from './Button'
import AddIcon from "../../assets/images/black_plus_icon.png"

const AddNewButton = (props) => {
    return (
        <Button onClick={props.onClick}>
            <div className="addnew--button">
                <h3>Add New</h3>
                <img src={AddIcon}/>
                {props.children}
            </div>
        </Button>
    )
}

export default AddNewButton