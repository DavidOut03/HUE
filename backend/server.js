// server setup
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Script imports
const authentication = require('./scripts/authentication');
const fileManager = require('./scripts/json_filemanager');
const settings = require('./scripts/settings');


//Setup server
const port = process.env.PORT || 3001;
app.listen(port, () => {console.log("Server is listening on port: " + port + ".")});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

//Setup authentication
const session = require("express-session");
app.use(session(
    {
        secret: 'secret', 
        resave: true, 
        saveUninitialized: true, 
        cookie: {maxAge: 120000}
    }
    ));

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

app.post("/login", (req, res) => {
    const {username, password} = req.body;


    if(req.session.isAuthenticated == true) {
        res.send({"processed": true,"message": "Successfully logged in."});
        return;
    }

    if(username == null || password == null || username == undefined || password == undefined) {
        res.send({"processed": false,"message": "Username or password is not right."});
        return false;
    } 

    const user = authentication.getAccountWithPassword(username, password);

    if(user != null) {
        req.session.isAuthenticated = true;
        res.send({"processed": true,"message": "Successfully logged in."});
    }
});

app.post("/settings", (req, res) => {
    const {hue_bridge_ip, hue_bridge_user} = req.body;

    if(hue_bridge_ip != null && hue_bridge_ip != undefined && hue_bridge_user != null && hue_bridge_user != undefined) {
        settings.setHueBridgeUser(hue_bridge_user);
        settings.setHueBridgeIP(hue_bridge_ip);
        res.send({"processed": true,"message": "Successfully updated the settings."});
    } else {
        res.send({"processed": false,"message": "Data couldn't be updated."});
    }
});


// if(authentication.getAccountWithPassword(username, password) != null) {
//     res.send({"processed": true,"message": "Successfully logged in.", "username": username, "password": password});
//    req.session.cookie.isAuthenticated = true;
// } else {
//    res.send({"processed": false,"message": "Username or password is not right."});
//    return;
// }