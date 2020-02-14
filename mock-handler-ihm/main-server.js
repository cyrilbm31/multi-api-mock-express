// CONFIG EXPRESS
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 3000;
const mainApi = "/mock-handler";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//FIXME à faire une convention de nommage
const fileServerPrefix = 'server-';
// CONFIG FICHIER
//FIXME à faire convention de nommage
var localisationMockedApp = "./app-mocked/*";
// IMPORT des utils
var tools = require('./utils/tools.js');

tools.initLoad(localisationMockedApp, app);


app.get(mainApi, (req, res) => {
    var serverFile = tools.findFile(req.query.servername);
    console.log('Handler mock for : ' + req.query.servername);
    if (serverFile) {
        console.log('Info: le fichier ' + serverFile + ' va être redemarrer...');
        delete require.cache[require.resolve(serverFile)];
        tools.suppress(serverFile, app._router.stack);
        tools.runFile(serverFile, app);
    } else {
        console.log('Le fichier n\'était pas chargé, il va être chargé');
        tools.runFile(serverFile, app);
    }
});



// LAUNCH SERVER
app.listen(port, () => {
    console.log("Express server started");
});
