const fs = require('fs');
const path = require('path');

let settings = { hue_bridge_ip: '0.0.0.0',
hue_bridge_user: 'abcd', }
let defaultSettings = { 
    hue_bridge_ip: '0.0.0.0',
    hue_bridge_user: 'abcd', 
};

const dir = "./hue-bridge";
const file = dir + "/settings.json";

if(!fs.existsSync(dir)) { fs.mkdirSync(dir, {recursive: true});}


exports.getSettings = () => {
    if(settings.keys.length > 0) {
        return settings;
    } else {
        let data = fs.readFileSync(path.resolve(dir, 'settings.json'));
        let parsedData = JSON.parse(data);

        settings = parsedData;
        return parsedData;
    }
}

exports.generateSettingsFile = () => {
    let data = JSON.stringify(defaultSettings, null, 2);

   fs.writeFile(file, data, (err) => {
    if (err) {console.log(err);};
  });
}

exports.getHueBridgeIP = () => {
    if(settings.hue_bridge_ip != null) {
        return settings.hue_bridge_ip;
    } else {
        let data = fs.readFileSync(path.resolve(dir, 'settings.json'));
        let parsedData = JSON.parse(data);

        settings.hue_bridge_user = parsedData.hue_bridge_user;
        return settings.hue_bridge_ip;
    }
}

exports.getHueBridgeUser = () => {
    if(settings.hue_bridge_user != null) {
        return settings.hue_bridge_user;
    } else {
        try {
            let data = fs.readFileSync(path.resolve(dir, 'settings.json'));
            let parsedData = JSON.parse(data);
            
            settings.hue_bridge_user = parsedData.hue_bridge_user;
            return parsedData.hue_bridge_user;
        } catch (err) {
            console.log(err);
            return defaultSettings.hue_bridge_user;
        }
       
    }
}

exports.setHueBridgeIP = (newip) => {
    settings.hue_bridge_ip = newip;

    let data = JSON.stringify(settings, null, 2);
    fs.writeFile(file, data, (err) => {
        if (err) {console.log(err);};
      });
}

exports.setHueBridgeUser = (newuser) => {
    settings.hue_bridge_user = newuser;

    let data = JSON.stringify(settings, null, 2);
    fs.writeFile(file, data, (err) => {
        if (err) {console.log(err);};
      });
}









