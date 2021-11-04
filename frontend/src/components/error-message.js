import {useState} from 'react';


function ErrorMessage(props) {
   
     return  (
     <div className="error">
        <h1 className="error__title">{props.title}</h1>
        <p className="error__message">{props.message}</p>
     </div>
     ); 
}

export default ErrorMessage;