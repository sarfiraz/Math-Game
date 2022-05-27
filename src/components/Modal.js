import React from "react";
import '../style.css';

//Modal component that we use in Content component
const Modal =(props)=>{
    if (!props.display)
        return null
    return(
        <div className="modal">
            <div className="modal-content">
                <div className="modal-head">
                    <h4>{props.title}</h4>
                </div>
                <div className="modal-body">
                    <p>{props.content}</p>
                </div>
                <div className="modal-foot">
                    <button onClick={props.closeModal} className="btn btn-danger">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Modal