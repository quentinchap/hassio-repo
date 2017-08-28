var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var options;


var router = express.Router();
router.use(bodyParser.json());

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    //console.log(req);
    options = req.app.get('options');
    next();
});

// define the home page route
router.get('/help', function(req, res) {
    res.send("help");
});

// channel selection
router.post('/', function(req, res) {
    var chaine = req.body.chaine;
    var key = req.body.key;

    if (key == options.key) {
        var stdChaine = getStdChaine(chaine);
        request.post({
            url: options.domain + "/api/services/media_player/select_source?api_password=" + options.homeAssistantPass,
            json: {
                "entity_id": "media_player.living_room_tv",
                "source": stdChaine
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else {
                console.error(response);
            }
        });
        res.send('Got a POST request ' + stdChaine);
    } else {
        res.status(401).send("Invalid Key")
    }

});

var getStdChaine = function(channel) {
    var lowerStr;
    var lowerChannel = channel.toLowerCase();
    for (let c of options.channels) {
        var channelTable = c.compatibleValue.split(",");

        for (let str of channelTable) {
            lowerStr = str.toLowerCase();
            console.log(lowerStr);
            if (lowerChannel == lowerStr) {
                return c.stdValue;
            }
        }

    }
    return "none";
    //var transformedChaine = chaine.replace(/\s/g, '');

    //transformedChaine = transformedChaine.toLowerCase();


    //if (chaine == "1" || chaine == "tf1") {
    //    return "TF1";
    //} else if (chaine == 6 || chaine == "m6") {
    //    return "M6";
    //}
}

module.exports = router;