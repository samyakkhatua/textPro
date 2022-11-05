import React, {useState} from 'react'
import TextShow from "./textShow";
import TextLogics from "./textLogics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function TextForm() {

    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setShowNewText(newText)
    }

    const handleLoClick = ()=>{
        let newText = text.toLowerCase();
        setShowNewText(newText)
    }
    
    const handleOnChange = (event)=>{
        setText(event.target.value)
    }

    const handleClearClick = () => {
        setText("")
    }

    const printRef = React.useRef();
    
    const handleSaveClick = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('text.pdf');
    }

    const [text, setText] = useState("");

    const [showNewText, setShowNewText] = useState("") 
    
    return (
        <>
        <div className='main'>
            <h4 className='heading'>Enter the text below to transform</h4>
            
            <div className='textForm'>
                <div className='textArea'>
                    <textarea className='' rows={1} cols={1} value={text} onChange={handleOnChange}></textarea>
                </div>

                <h4 className='heading' style={{paddingTop: "10px", paddingLeft: "10px"}}>Preview</h4>
                <div ref={printRef} style={{padding:"10px"}}>
                    <TextShow showNewText={showNewText}/>
                </div>

            </div>   
        </div>

        <div className='textLogics'>
            <TextLogics text={text}/>
        </div>

        <div className='buttonsArea'>
                <button className='button' onClick={handleUpClick}>
                    A
                    <span className="tooltiptext">Upper Case</span>
                </button>

                <button className='button' onClick={handleLoClick}>
                    a
                    <span className="tooltiptext">Lower Case</span>
                </button>

                <button className='button' onClick={handleClearClick}>
                    <FontAwesomeIcon icon={faTrashCan} size="" />
                    <span className="tooltiptext">Clear</span>
                </button>

                <button className='button' onClick={handleSaveClick}>
                    <FontAwesomeIcon icon={faSave} />
                    <span className="tooltiptext">Save as PDF</span>
                </button>

        </div>
        
        </>
    )
}