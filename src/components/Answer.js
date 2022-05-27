import React from 'react';
import data from '../levels.json';
import {DragDropContainer} from "react-drag-drop-container";
import '../style.css';

//Answer component that we use in Content component
const Answer = (props)=>{
    return(
            <DragDropContainer targetKey="weGood" disappearDraggedElement={true} dragData={data[props.arg].answer} >
                <div className="container d-flex justify-content-center align-items-center m-1 item" style={props.style} >
                    <h5>{data[props.arg].answer}</h5>
                </div>
            </DragDropContainer>
    )
}

export default Answer