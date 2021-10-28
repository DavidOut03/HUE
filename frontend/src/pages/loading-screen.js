import {useState} from 'react';


function LoadingScreen() {
   
     return  (
     <div className="loading-screen">

       <div className="loading-screen__content">
         <div className="loading-screen__circle"></div>
         <div className="loading-screen__circle"></div>
         <div className="loading-screen__circle"></div>
       </div>
     </div>
     ); 
}

export default LoadingScreen;