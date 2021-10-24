// require('dotenv').config();
const axios = require('axios');

// Create new user address/api/ || body: {"devicetype": "my_hue_app#new_device"}
// Get all lights address/api/username/lights
// Get one light address/api/username/lights/lightID/
// Turn light on address/api/username/lights/lightID/state || body: {"on": true}
// Turn light off address/api/username/lights/lightID/state || body: {"on": false}
// Set light color address/api/username/lights/lightID/state || body: {"on": false, "sat": 254, "bri": 254, "hue": 20000}
// Light ranges:
//   saturation: 0-254
//   brightness: 0-254
//   hue: 0-65535

// Hue bridge:
const HUE_BRIDGE_IP = '192.168.188.26';
const HUE_BRIDGE_USERNAME='pIWSP34ppV1JVu-HrVPtqjaOysbOdLb3-n61nFfU';

const basicURL = "http://" + HUE_BRIDGE_IP + "/api/" + HUE_BRIDGE_USERNAME + "/lights";


  async function getLights() {
    try {
      const res = await axios.get(basicURL);
      const lightdata = res.data;

      let lights = [];
      for (let [key, value] of Object.entries(lightdata)) {
    
        lights.push( { name: value.name, id: key, on: value.state.on } );
        
      }

      return lights;
    } catch (error) { console.log(error) }
  }


   function controlLight(lightID, on) {
    const data = {"on": on}

    axios.put(basicURL + "/" + lightID + "/state", data).then((res) => {
      // console.log("Status: ", res.status);
      // console.log("Body: ", res.data);
    }).catch((err) => {console.log(err)});
  }

  function setLightColor(lightID, brightness, saturation, hue) {
    const data = {"on":true, "sat":saturation, "bri":brightness,"hue":hue};

    axios.put(basicURL + "/" + lightID + "/state", data).then((res) => {
      // console.log("Status: ", res.status);
      // console.log("Body: ", res.data);
    }).catch((err) => {console.log(err)});
  }


 
  // RED:   setLightColor(lightID, 254, 254, 0);
  // BLUE: setLightColor(lightID, 254, 254, 45000);

  // function Alarm(lights) {
  //   const intervalTimerSeconds = .5;
  //   const maxCount = 10;


  //   var count = 0;
  //   var blue = true;
  //   const interval = setInterval(() => {
  //     count++;

  //     if(count < maxCount) {
        

  //      if(blue === true) {
  //       for(var i = 0; i < lights.length; i++) {
  //         setLightColor(lights[i], 254, 254, 0);
  //       }
  //        blue = false;
  //      } else {
  //       for(var i = 0; i < lights.length; i++) {
  //         setLightColor(lights[i], 254, 254, 45000);
  //       }
  //        blue = true;
  //      }

  //       console.log(blue);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, (intervalTimerSeconds * 1000));
  // }

exports.getLights = getLights;
exports.setLightColor = setLightColor;
exports.controlLight = controlLight;


