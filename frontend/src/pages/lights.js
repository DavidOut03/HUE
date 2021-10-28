import {useEffect, useState} from 'react';
import Sidebar from '../components/sidebar'
import hue from '../scripts/hue';
import LoadingScreen from "./loading-screen";


function Lights() {
    const [lights, setLights] = useState([]);
    const [load, setLoading] = useState(false);
    
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

     hue.getLights().then((light) => {setLights(light);}).catch((err) => {console.log(err); setLights([{name: "Example", id: "1", on: true}]);});
    }

    if(load === true) {
        return <LoadingScreen/>
    }

    if(lights != null && Array.isArray(lights) && lights.length > 0) {
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
  } else {
    hue.getLights().then((light) => {setLights(light);}).catch((err) => { setLoading(true); console.log(err); setLights([{name: "Example", id: "1", on: true}]);});
    return <LoadingScreen/>
  }
}

export default Lights;