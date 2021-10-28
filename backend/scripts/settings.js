const fileManager = require('./json_filemanager');

let settings = { hue_bridge_ip: '0.0.0.0',
hue_bridge_user: 'abcd', }
let defaultSettings = { 
    hue_bridge_ip: '0.0.0.0',
    hue_bridge_user: 'abcd', 
};

const dir = "./hue-bridge";
const file = dir + "/settings.json";

exports.getSettings = () => {
    if(Object.keys(settings).length > 0) {
        return settings;
    } else {
        const parsedData = fileManager.getFileData("settings", "/hue-bridge");
        settings = parsedData;
        return parsedData;
    }
}

exports.generateSettingsFile = () => {}

exports.getHueBridgeIP = () => {
    if(settings.hue_bridge_ip != null) {
        return settings.hue_bridge_ip;
    } else {
        const parsedData = fileManager.getFileData("settings", "/hue-bridge");
        settings.hue_bridge_ip = parsedData.hue_bridge_ip;
        return settings.hue_bridge_ip;
    }
}

exports.getHueBridgeUser = () => {
    if(settings.hue_bridge_user != null) {
        return settings.hue_bridge_user;
    } else {
        try {
            const parsedData = fileManager.getFileData("settings", "/hue-bridge");
            settings.hue_bridge_user = parsedData.hue_bridge_user;
            return settings.hue_bridge_user;
        } catch (err) {
            console.log(err);
            return defaultSettings.hue_bridge_user;
        }
    }
}

exports.setHueBridgeIP = (newip) => {
    settings.hue_bridge_ip = newip;
    fileManager.setFileData("settings", "/hue-bridge", settings);
}

exports.setHueBridgeUser = (newuser) => {
    settings.hue_bridge_user = newuser;
    fileManager.setFileData("settings", "/hue-bridge", settings);
}


