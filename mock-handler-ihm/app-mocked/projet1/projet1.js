const baseEndpoint = '/projet1';



/**
 *  LES APPELS DES APIS SONT A METTRE ICI
 * @param express
 */
const listenCall = function (express) {
    express.get(baseEndpoint + '/test1', (req, res) => {
        console.log('i will catch it ');
        res.status(200).jsonp('Ok 3 ');


    express.get(baseEndpoint + '/test2', (req, res) => {
        console.log('i will change it');
        res.status(200).jsonp('Ok 2');
    });
};




/** LES FONCTIONS CI DESSOUS NE SONT PAS A MODIFIER POUR PERMETTRE LE FONCTIONNEMENT EN MODE STANDALONE ET MULTI API
 * ( SAUF  LE PORT DE EXPRESS)
 */
let isProdMode;
/**
 * Listenner des appels pour l'api
 */
const startApi = function config(express) {
    console.log('je start ' + baseEndpoint);
    isProdMode = true;
    listenCall(express)
};
setTimeout( () => {
    /**
     * Permet de configurer express pour un usage local
     */
    if (!isProdMode) {
        console.log('Configuration du server en mode local pour l\'API : ' + baseEndpoint);
            const bodyParser = require('body-parser');
            const express = require("express");
            const app = express();
            const port = 3000;
            app.use(bodyParser.urlencoded({ extended: false }));
            app.use(bodyParser.json());

            startApi(app);
            app.listen(port, () => {
                console.log("Express server started");
            });
    }
}, 10);


module.exports =  {
    startApi, baseEndpoint
};
