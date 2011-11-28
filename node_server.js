// Dependencies
var http       = require('http'), // For HTTP connections and listeners
    site       = false
    dateString = (new Date("2011-01-01 12:00")).toISOString().replace(/T/g,' ').replace(/Z|\.[0-9]{3}/g,'');

// Create local server (for proxies)
http.createServer(function (req, res) {
    // Get the requested domain name
    var host = req.headers.host;

    // Try to serve the module for the domain name
    // Otherwise show a server error
    try {
        site = require('sites/'+host);
        site.process(req, res);
    } catch (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Site module error:\n" + err);
        console.log(dateString + ": Site module error: " + err);
    }

    // If after 5 seconds things haven't finished, force it to end
    setTimeout(
        function() {
            res.end('Content module timed out. Forced response to end.');
        },
        5000
    );
}).listen(8081, 'localhost');

