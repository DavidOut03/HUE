import {useState} from 'react';
import Sidebar from '../components/sidebar'
import hue from '../scripts/hue';



function GetLights() {
   
}


function Lights() {
    const [lights, setLights] = useState([{name: "Exapmple", id: "1", on: true}]);
    hue.getLights().then((light) => {setLights(light);}).catch((err) => {console.log(err); setLights([{name: "Exapmple", id: "1", on: true}]);});

    function getLight(id) {
        return lights.find((light) => light.id === id);
    }

    function toggleLight(event) {
     const target = event.target.id;
     const id = target.split('-')[2];
     const light = getLight(id);

     if(light.on === true) {
         event.target.checked = false;
         hue.controlLight(light.id, false);
     } else {
         event.target.checked = true;
         hue.controlLight(light.id, true);
     }
    }

     return  (<div className="body">

     <Sidebar/>
     
     <div className="page-heading">
         <h1 className="heading filled">Lights</h1>
     </div>
     
     <div className="page-content">
         <ul className="lights">
         {lights.map((light) => { 
             return (  <li className="light">
                 <p className="light__id">{light.id}</p>
                 <p className="light__name">{light.name}</p>
     
                 <div className="light__checkbox">
                   
                     <label for={"light-toggle-" + light.id} className="light__button">
                       <input type="checkbox" name="light-cb" id={"light-toggle-" + light.id}  className="light__checkbox__input" checked={light.on} onClick={toggleLight}/>
                         <span className="light__icon"></span>
                     </label>
                 </div>
     
     
             </li>);
           })}
           
             
         </ul>
     </div>
     </div>
     ); 
}

export default Lights;