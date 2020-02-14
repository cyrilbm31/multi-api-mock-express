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
/**
 * Chargement initial
 */
tools.initLoad(localisationMockedApp, app);

/**
 * Permet de restart une api en lui passant son nom
 */
app.get(mainApi, (req, res) => {
    var serverFile = tools.findFile(req.query.servername);
    console.log('Handler mock for : ' + req.query.servername);
    if (serverFile) {
        console.log('Info: le fichier ' + serverFile + ' va être redemarrer...');
        delete require.cache[require.resolve(serverFile)];
        tools.suppress(serverFile, app._router.stack);

        const returnOfFileLoad =   tools.runFile(serverFile, app);
        if (returnOfFileLoad) {
            res.status(200).jsonp('Api restarted');
        } else {
            res.status(500).jsonp('Erreur dans l\'api,  redemarrage arreté' );
        }
    } else {
        console.log('Le fichier n\'était pas chargé, il va être chargé');
          const returnOfFileLoad =   tools.runFile(serverFile, app);
          if (returnOfFileLoad) {
              res.status(200).jsonp('Api restarted');
          } else {
              res.status(500).jsonp('Erreur dans l\'api,  redemarrage arreté' );
          }
    }
});



// LAUNCH SERVER
app.listen(port, () => {
});
