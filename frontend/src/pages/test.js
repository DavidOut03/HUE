import react, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import LoadingScreen from './loading-screen';
import hue from '../scripts/hue';


const basicURL = "http://192.168.188.26/api/pIWSP34ppV1JVu-HrVPtqjaOysbOdLb3-n61nFfU/lights";

// axios.get("http://192.168.188.26/api/pIWSP34ppV1JVu-HrVPtqjaOysbOdLb3-n61nFfU/lights")
// .then((response) => {
//     const lightdata = response.data;
//     let lgs = [];
//     for (let [key, value] of Object.entries(lightdata)) {
//         lgs.push( { name: value.name, id: key, on: value.state.on } );
//     }
//     setLights(lgs);
// }

function Test() {
}

export default Test;