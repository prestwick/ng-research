/*jslint nomen: true */
/*jslint node: true */

var handler,
    app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    path = require('path'),
    port = 1337,
    utilTimer,
    k,
    initGaugeType,
    widgetIdRegistry = {
        sliderType: ['slider1'],
        numericType: ['numeric1'],
        gaugeType: []
    };

for (k = 0; k < 50; k += 1) {
    widgetIdRegistry.gaugeType.push('gauge' + k);
}

app.listen(port);

//file server implementation
function handler(req, res) {
    "use strict";
    var filePath = req.url,
        extentionName  = path.extname(filePath),
        contentType = 'text/html';
    
    if (filePath === '/') {
        filePath = '/index.html';
    } else {
        filePath = req.url;
    }
        
    switch (extentionName) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    case '.png':
        contentType = 'image/png';
        break;
    }
    console.log(filePath);
    
    fs.readFile(__dirname + filePath, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
}

//websocket implementation
io.sockets.on('connection', function (socket) {
    "use strict";
    //initGaugeType();
    console.log('connection called');
    socket.emit('init', widgetIdRegistry); //change
    
    var rate = 1000,
        i,
        j,
        data = {},
        randEmit = function () {
            for (j = 0; j < widgetIdRegistry.gaugeType.length; j += 1) {
                data = {widgetType: 'gauge', id: widgetIdRegistry.gaugeType[j], value: Math.random() * 100};
                socket.emit(widgetIdRegistry.gaugeType[j], data);
            }
            
        };
    
    
    utilTimer.startTimer(randEmit, rate);
    
    socket.on('runtime-data-direction-b', function (o) {
        utilTimer.stopTimer();
        rate = o.rate;
        utilTimer.startTimer(randEmit, rate);
    });
});

//helper objects
var utilTimer = (function () {
    "use strict";
    var stopped = false,
        internalTimerObject,
        startTimer = function (callback, interval) {
            stopped = false;
            internalTimerObject = setInterval(callback, interval);
        },
        stopTimer = function () {
            clearInterval(internalTimerObject);
        };
    return {
        startTimer: startTimer,
        stopTimer: stopTimer
    };
}());

