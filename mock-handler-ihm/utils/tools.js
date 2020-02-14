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
    expressRouter.filter (route => route.route &&
        route.route['path'].includes(mapInstanceWithEndpoint.get(serverFile).toString()))
        .forEach( routeTemp => {
            console.log('Delete : ' + routeTemp.route['path']);
            expressRouter.splice(expressRouter.indexOf(routeTemp), 1);
        });
};
/**
 * Permet d'ajouter un fichier de server au main server seulement si celui ci est valide
 * @param jsFile
 */
const runFile = function runJsFileServer(jsFile, app) {
    try {
        var instanceOfJsFile = require( fixDirectoryFile + jsFile);
        instanceOfJsFile.startApi(app);
        instanceSrv.push(jsFile);
        mapInstanceWithEndpoint.set(jsFile,instanceOfJsFile.baseEndpoint);
        console.log('Chargement réussi ...\n');
        return true;
    } catch (err) {
        console.error('Erreur : fichier  ' + jsFile);
        console.log('Chargement échoué ... \n');
        return false;
    }
};
/**
 * Initialise le server en chargeant tous les server js valides
 * @param localisationMockedApp
 */
const initLoad = function(localisationMockedApp, express) {
    console.log('Init du serveur le ' + new Date());
    console.log('Detection des fichiers.. \n');
    glob(localisationMockedApp  + "/*.js", {}, function (er, files) {
        console.log('Fichiers présents : ');
        console.log(files +'\n');
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

