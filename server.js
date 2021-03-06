var http = require('http')
    , fs = require('fs')
    , url = require('url')
    , database = require('./database.js')
    , port = 8080;

// Database setup
console.log('connecting to database');
database.connect();

console.log('connected to database');

// Upload data (comment out)
uploadToDatabase("inventory", "data/inventory.json");
uploadToDatabase("object_use", "data/object_use.json");
uploadToDatabase("scene1_interaction", "data/scene1_interaction.json");

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url)

    switch (uri.pathname) {
        case '/':
            sendFile(res, 'index.html')
            break
        case '/index.html':
            sendFile(res, 'index.html')
            break
        case '/screens/mainScreen.html':
            sendFile(res, 'screens/mainScreen.html')
            break
        case '/screens/storyScreen.html':
            sendFile(res, 'screens/storyScreen.html')
            break       
        case '/screens/rulesScreen.html':
            sendFile(res, 'screens/rulesScreen.html')
            break
        case '/screens/tutorialScreen.html':
            sendFile(res, 'screens/tutorialScreen.html')
            break
        case '/screens/endScreen.html':
            sendFile(res, 'screens/endScreen.html')
            break 
        case '/screens/scoreScreen.html':
            sendFile(res, 'screens/scoreScreen.html')
            break
        case '/style.css':
            sendFile(res, 'style.css', 'text/css')
            break
        case '/js/sceneHandler.js':
            sendFile(res, 'js/sceneHandler.js', 'text/javacript')
            break
        case '/js/characterSelection.js':
            sendFile(res, 'js/characterSelection.js', 'text/javacript')
            break
        case '/js/item.js':
            sendFile(res, 'js/item.js', 'text/javascript')
            break
        case '/js/timer.js':
            sendFile(res, 'js/timer.js', 'text/javascript')
            break
        case '/js/mainScreen.js':
            sendFile(res, 'js/mainScreen.js', 'text/javascript')
            break
        case '/js/requestToServer.js':
            sendFile(res, 'js/requestToServer.js', 'text/javascript')
            break
        //IMAGES//
        case '/assets/scenes/mansion.png':
            sendFile(res, 'assets/scenes/mansion.png')
            break
        case '/assets/items/tree.png':
            sendFile(res, 'assets/items/tree.png')
            break
        case '/assets/items/catnip.png':
            sendFile(res, 'assets/items/catnip.png')
            break
        case '/assets/items/doorLeft.png':
            sendFile(res, 'assets/items/doorLeft.png')
            break
        case '/assets/items/doorRight.png':
            sendFile(res, 'assets/items/doorRight.png')
            break
        case '/assets/items/window.png':
            sendFile(res, 'assets/items/window.png')
            break
        case '/assets/items/boardedwindow.png':
            sendFile(res, 'assets/items/boardedwindow.png')
            break
        case '/assets/items/rock.png':
            sendFile(res, 'assets/items/rock.png')
            break
        case '/assets/items/lighter.png':
            sendFile(res, 'assets/items/lighter.png')
            break
        case '/assets/items/cat.png':
            sendFile(res, 'assets/items/cat.png')
            break
        case '/assets/items/catKey.png':
            sendFile(res, 'assets/items/catKey.png')
            break
        case '/assets/items/keyDoor.png':
            sendFile(res, 'assets/items/keyDoor.png')
            break
        case '/inspect':
            console.log('Inspecting request')
            inspectObject(req, res)
            break
        case '/inspect2':
            inspectObject2(req, res)
            break;
        case '/add':
            saveScore(req, res)
            break
        case '/score':
            sendScores(res)
            break
        case '/description':
            getInformation(req, res)
            break
        case '/interaction':
            getInteraction(req, res)
            break
        case '/assets/Waypoint_D.ogg':
            sendFile(res,'assets/Waypoint_D.ogg', 'audio/ogg' )
            break
        case '/assets/characters/Erika.png':
            sendFile(res,'assets/characters/Erika.png' )
            break
        case '/assets/characters/Ally.png':
            sendFile(res,'assets/characters/Ally.png' )
            break
        case '/assets/characters/Joan.png':
            sendFile(res,'assets/characters/Joan.png' )
            break
        case '/assets/characters/Krysta.png':
            sendFile(res,'assets/characters/Krysta.png' )
            break
        default:
            res.end('404 not found')
    }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080');

/*------subroutines-------*/
function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, { 'Content-type': contentType })
        res.end(content, 'utf-8')
    });
}

function inspectObject(req, res) {
    console.log('Inspecting result...');
    var input = [];

    req.on('data', function(data) {
        input.push(JSON.parse(data));
    });

    req.on('end', function() {
        console.log('Getting id from database...');
        database.getInspectResult(input[0].player, input[0].obj_id, res);
    });
}

function inspectObject2(req, res) {
    console.log('Inspecting result2...');
    var input = [];

    req.on('data', function(data) {
        input.push(JSON.parse(data));
    });

    req.on('end', function() {
        console.log('Getting id from database...');
        database.getInspectResult2( input[0].obj_id, res);
    });
}
function getInformation(req, res) {
    var input = [];

    req.on('data', function(data) {
        input.push(JSON.parse(data));
    });

    req.on('end', function() {
        console.log('Getting id from database...');
        database.getDescription(input[0].use_id, res);
    });
}

function getInteraction(req, res) {
    var input = [];

    req.on('data', function(data) {
        input.push(JSON.parse(data));
    });

    req.on('end', function() {
        database.getFunction(input[0].player, input[0].obj_id, input[0].scene_id, res);
    });
}

function saveScore(req, res) {
    var input = [];

    req.on('data', function(data) {
        input.push(JSON.parse(data));
    });

    req.on('end', function() {
        console.log('input is: ' + JSON.stringify(input));
        database.addScore(input[0].name, input[0].score);
        res.end();
    });
}

function sendScores(res) {
    database.getAllScores(res);
}

function uploadToDatabase(table, filename) {
    var stream = fs.createReadStream(filename);

    stream.on('data', function (data) {
        if (table === "inventory") {
            database.uploadToInventory(JSON.parse(data));
        } else if (table === "object_use") {
            database.uploadToObjectUse(JSON.parse(data));
        } else {
            database.uploadToScene1(JSON.parse(data));
        }
    });

    stream.on('end', function (data) {
        return;
    });
}