import {useState} from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import LoadingScreen from "../components/loading-screen";
import SuccessMessage from "../components/success-message";
import ErrorMessage from "../components/error-message";
import SettingsComponent from "../components/settings-component";


function Settings(props) {
    const [settings, setSettings] = useState(null);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(false);

    function update() {
        setUpdated(true);

        setTimeout(() => {
            axios.get('/settings/hue-bridge').then((response) => {setSettings(response.data);}).catch((error) => {setError({title: "Could not update settings.", message: error.message});});
            setUpdated(false);
        }, 5000);

        console.log("Updated");
    }


    function saveChanges(event)  {
        event.preventDefault();

        axios.post("/settings", settings).then((response) => {
            const data = response.data;
            if(data.processed === true) {
                update();
            } else {
                setError({title: "Couldn't update settings.", message: data.message});
            }
        }).catch((err) => {setError({title: "Could not update settings.", message: err.message});});
    }

    function handleChange(event) {
        const newValue = event.target.value;
        const newSettings = settings;
        newSettings[event.target.id] = newValue;
        setSettings(newSettings);
    }
        

    if(settings != null) {
        if(error != null) {
            return <div>
                <ErrorMessage title={error.title} message={error.message}/>
                <SettingsComponent settings={settings} onChange={handleChange} onSave={saveChanges}/>
            </div>
        }

        if(updated === true) {
            return <div>
                <SuccessMessage title="Update" message="Successfully updated the settings"/> 
                <SettingsComponent settings={settings} onChange={handleChange} onSave={saveChanges}/>
            </div>
        }

        return <SettingsComponent settings={settings} onChange={handleChange} onSave={saveChanges}/>
    } else {
        axios.get('/settings/hue-bridge').then((response) => {
            setSettings(response.data);
        }).catch((error) => {
            return <ErrorMessage title="Error" message={error.message}/>
        });
        return <LoadingScreen/>;
        
    }
   
}

// const [lights, setLights] = useState([]);
// const [load, setLoading] = useState(false);

// function getLight(id) {
//     return lights.find((light) => light.id === id);
// }

// function toggleLight(event) {
//  const target = event.target.id;
//  const id = target.split('-')[2];
//  const light = getLight(id);

//  if(light.on === true) {
//      event.target.checked = false;
//      hue.controlLight(light.id, false);
//  } else {
//      event.target.checked = true;
//      hue.controlLight(light.id, true);
//  }

//  hue.getLights().then((light) => {setLights(light);}).catch((err) => {console.log(err); setLights([{name: "Example", id: "1", on: true}]);});
// }

// if(load === true) {
//     return <LoadingScreen/>
// }

// if(lights != null && Array.isArray(lights) && lights.length > 0) {
//  return  (<div className="body">

//  <Sidebar/>
 
//  <div className="page-heading">
//      <h1 className="heading filled">Lights</h1>
//  </div>
 
//  <div className="page-content">
//      <ul className="lights">
//      {lights.map((light) => { 
//          return (  <li className="light">
//              <p className="light__id">{light.id}</p>
//              <p className="light__name">{light.name}</p>
 
//              <div className="light__checkbox">
               
//                  <label for={"light-toggle-" + light.id} className="light__button">
//                    <input type="checkbox" name="light-cb" id={"light-toggle-" + light.id}  className="light__checkbox__input" checked={light.on} onClick={toggleLight}/>
//                      <span className="light__icon"></span>
//                  </label>
//              </div>
 
 
//          </li>);
//        })}
       
         
//      </ul>
//  </div>
//  </div>
//  ); 
// } else {
// hue.getLights().then((light) => {setLights(light);}).catch((err) => { setLoading(true); console.log(err); setLights([{name: "Example", id: "1", on: true}]);});
// return <LoadingScreen/>
// }


export default Settings;