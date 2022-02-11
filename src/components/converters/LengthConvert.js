import React from "react";

export default function LengthConvert(props) {

    const {
        LengthOptions
    } = props

    return(
        <div className="Length">
            <input className="input"type='number'></input>
            <select className="select">
                {LengthOptions.map(option => (
                    <option value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
}