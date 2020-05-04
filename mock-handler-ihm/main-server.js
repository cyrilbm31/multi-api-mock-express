// CONFIG EXPRESS
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 3000;
const mainApi = "/mock-ihm-handler/";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin','*');
         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.setHeader('Access-Control-Expose-Headers','Content-Length,Content-Range');
res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});


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
* Listes des apis
*/
const restartApi = 'restart';
const login = 'login';


/**
 * Permet de restart une api en lui passant son nom
 */
app.get(mainApi + restartApi, (req, res) => {
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

app.post(mainApi + login, (req, res) => {
const dbConnect = require('./db/db-connection.json');


    console.log('jai reach');
// TODO FAIRE UNE FONCTION
res.status(200).jsonp(dbConnect.connectionSuccess);
             });

// LAUNCH SERVER
app.listen(port, () => {
});
