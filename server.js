"use strict";
const express = require("express");
const compression = require("compression");

const _app_folder = 'dist/web';
var _port = 4190;

  
const app = express();
app.use(compression());

if ( app.get('env') === 'stage' ) {
  _port = 4200;
}


// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, { maxAge: '1y' }));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function(req, res) {
    res.status(200).sendFile(`/`, { root: _app_folder });
});

// ---- START UP THE NODE SERVER  ----
app.listen(_port, function() {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});
