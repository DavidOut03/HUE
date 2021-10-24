// server setup
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log("Server is listening on port: " + port + ".")});


// Script imports
const settings = require('./scripts/settings');


//Routes

app.get("/settings/hue-bridge-ip", (req, res) => {
    res.send({status: 200, ip: settings.getHueBridgeIP()});
});

app.get("/settings/hue-bridge-user", (req, res) => {
    res.send({status: 200, user: settings.getHueBridgeUser()});
});

app.get("/settings/hue-bridge-ip/:newIP", (req, res) => {
    const newIP = req.params.newIP;
    settings.setHueBridgeIP(newIP);
    res.redirect("/settings/hue-bridge-ip");
});

app.get("/settings/hue-bridge-user/:newUser", (req, res) => {
    const newUser = req.params.newUser;
    settings.setHueBridgeUser(newUser);
    res.redirect("/settings/hue-bridge-user");
})