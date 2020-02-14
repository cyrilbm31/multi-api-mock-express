var baseEndpoint = '/projet2';

function main(test) {
console.log('je start ' + baseEndpoint);

    test.get(baseEndpoint + '/test1', (req, res) => {
        console.log('i will catch it ');
        res.status(200).jsonp('Ok ');

    });
    test.get(baseEndpoint + '/test2', (req, res) => {
        console.log('i will change it');
        res.status(200).jsonp('Ok');
    });


}


module.exports = function (server) {
    main(server);
    return  baseEndpoint;
};
