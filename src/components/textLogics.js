import React from 'react'

export default function TextLogics(props) {
    let text = props.text;

    return(
        <>
        <div>
            <p className='logicData'>Reading Time: {(0.008 * text.split(" ").length).toFixed(2)} minutes</p>
        </div>

        <div>
        <p className='logicData'>{text.split(" ").length} words & {text.length} characters</p>
        </div>
        </>
    )
}