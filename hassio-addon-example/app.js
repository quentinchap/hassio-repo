// Chargement de la bibliothèque express
var express = require('express');
var app = express();

/* Création d'une route. Chaque route correspondra à un URL différent. 
   Ici cela correspond à http://mon_adresse/
   Si nous avions  app.get('/name', function (req, res) {
   La route serait http://mon_adresse/name 
*/
app.get('/', function(req, res) {
    /*
       Fonction à déclencher lorsque la route est sollicitée. 
       Le paramètre req correspond à la requête faite sur la route et res à la réponse qui lui sera faite.
       Ici on renvoi la chaîne de caractère Hello world!
    */
    res.send('Hello World!');
});

// création de la route /name
app.get('/name', function(req, res) {
    // On récupére le paramètre name
    var name = req.param('name');
    // On le renvoi dans la réponse
    res.send('Hello ' + name);
});

// Chargement de la bibliothèque
var bodyParser = require('body-parser')
app.use(bodyParser.json());

// Création d'un route post
app.post('/name', function(req, res) {
    //récupération de la propriété name dans le body
    var name = req.body.name;
    res.send('POST: hello ' + name);
});

var request = require('request');

app.get('/testApi', function(req, res) {
    request.get({
        url: "https://en.wikipedia.org/api/rest_v1/page/"
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        } else {
            res.send('error');
        }
    });

});

// On écoute le port 3000
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});