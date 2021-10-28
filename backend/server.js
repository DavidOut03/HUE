// server setup
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
app.listen(port, () => {console.log("Server is listening on port: " + port + ".")});


// Script imports
const authentication = require('./scripts/authentication');
const fileManager = require('./scripts/json_filemanager');
const settings = require('./scripts/settings');

//Generate default files
if(!fileManager.fileExists("settings", "/data")) {
    fileManager.createFile("settings", "/data");
}

if(!fileManager.fileExists("users", "/data")) {
    fileManager.createFile("users", "/data");
    fileManager.setFileData("users", "/data", []);
} else {
    //Creates default admin account if there are no accounts registered.
    if(authentication.getAccounts().length <= 0) {
        authentication.createAccount("admin", "admin");
    }
}

//Routes
app.get("/settings/hue-bridge/", (req, res) => {
    res.send(settings.getSettings());
});

app.get("/settings/hue-bridge/ip", (req, res) => {
    res.send({status: 200, ip: settings.getHueBridgeIP()});
});

app.get("/settings/hue-bridge/user", (req, res) => {
    res.send({status: 200, user: settings.getHueBridgeUser()});
});

app.get("/settings/hue-bridge/ip/:newIP", (req, res) => {
    const newIP = req.params.newIP;
    settings.setHueBridgeIP(newIP);
    res.redirect("/settings/hue-bridge/ip");
});

app.get("/settings/hue-bridge/user/:newUser", (req, res) => {
    const newUser = req.params.newUser;
    settings.setHueBridgeUser(newUser);
    res.redirect("/settings/hue-bridge/user");
});

app.get("/account/:username", (req, res) => {
    res.send(authentication.getAccount(req.params.username));
});

app.get("/account/edit/username/:username/:newUserName", (req, res) => {
    const back = authentication.setUsername(req.params.username, req.params.newUserName);
    res.send(back);
});

app.get("/account/edit/password/:username/:newPassword", (req, res) => {
    const back = authentication.setPassword(req.params.username, req.params.newPassword);
    res.send(back);
});

app.get("/account/:username/:password", (req, res) => {
    if(authentication.accountExists(req.params.username)) {
        res.redirect("/account/edit/password/" + req.params.username + "/" + req.params.password);
    } else {
        res.send(authentication.createAccount(req.params.username, req.params.password));
    }
});