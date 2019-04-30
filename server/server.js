var express = require('express');
var app = express();
const parser = require('./parser');

/**
 * Allows to recover all posts
 */
app.get('/posts', (req, res) => {
    res.end(JSON.stringify(posts));
});

// Scan all posts
var posts = parser.scanPosts();

// Start the server on port 8081
var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server api listening at http://%s:%s", host, port);
});