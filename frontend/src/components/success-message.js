import {useState} from 'react';


function SuccessMessage(props) {
   
     return  (
     <div className="success-message">
        <h1 className="success-message__title">{props.title}</h1>
        <p className="success-message__text">{props.message}</p>
     </div>
     ); 
}

export default SuccessMessage;