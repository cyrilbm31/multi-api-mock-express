//TAB INSTANCES SERVER
var instanceSrv = [];
var mapInstanceWithEndpoint = new Map();
var fixDirectoryFile = './../';
// CONFIG FILE & IMPORT
var glob = require("glob");


/**
 * Permet de supprimer les routes pour une base d'api rest donnée :
 *  /nom_appli/wsrest/* (trouvée à l'aide de la map
 * @param serverFile
 * @param expressRouter
 */
const suppress = function suppressRoutesForEndpoint(serverFile,expressRouter) {
    console.log('Info : les routes de l\'api vont être supprimées ...');
    expressRouter.forEach(route => {
        if (route.route && route.route['path'].includes(mapInstanceWithEndpoint.get(serverFile).toString(),)) {
            expressRouter.splice(expressRouter.indexOf(route), 1);
            console.log('Delete : ' + route.route['path']);
        }
    });
};
/**
 * Permet d'ajouter un fichier de server au main server seulement si celui ci est valide
 * @param jsFile
 */
const runFile = function runJsFileServer(jsFile, app) {
    try {
        var instanceOfJsFile = require( fixDirectoryFile + jsFile.toString())(app);
        instanceSrv.push(jsFile);
        mapInstanceWithEndpoint.set(jsFile,instanceOfJsFile);
        console.log('Chargement réussi ...');
    } catch (err) {
        console.error('Erreur : ' + jsFile);
        console.error('========');
        console.error(err);
        console.error('========');
    }
};
/**
* Initialise le server en chargeant tous les server js valides
 * @param localisationMockedApp
 */
const initLoad = function(localisationMockedApp, express) {
    console.log('Init du serveur le ' + new Date());
    console.log(localisationMockedApp);
    glob(localisationMockedApp  + "/*.js", {}, function (er, files) {
        console.log(files);
        files.forEach(file => {
            console.log('Chargement du fichier : ' + file);
            runFile(file, express);
        });
    });
};
/**
 * Permet de retrouver un file depuis le nom du server/projet
 * @param servername
 * @returns {*}
 */
const findFile = function (servername) {
    return instanceSrv.find(server => server.includes(servername));
};
/**
 * Permet d'exporter le module
 */
module.exports =  {
    suppress, runFile, findFile,initLoad
};

