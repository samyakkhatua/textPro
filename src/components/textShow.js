import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from '@fortawesome/free-solid-svg-icons';


export default function TextShow(props) {
    let showText = props.showNewText;
      
    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } 
        else {
          return document.execCommand('copy', true, text);
        }
      }
    
      const handleCopyClick = () => {
        copyTextToClipboard(showText)
        .then(() => {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
        })
        .catch((err) => {
            console.log(err);
        });

      }

    const [isCopied, setIsCopied] = useState(false);

    return (
        <>
        <div className='textShow'>
            {/* <h4 style={{paddingTop: "10px"}}>PREVIEW</h4> */}
            <p className='textShowPara'>{showText}</p>
            
            <div className='copyDiv'>
              <button className='copyButton' onClick={handleCopyClick}>
                {isCopied ? 'Copied!' : <FontAwesomeIcon icon={faCopy} size="" />}
              </button>
            </div>
        </div>
        </>
        
    )
}