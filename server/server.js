var express = require('express');
var app = express();
const parser = require('./parser');

/**
 * Allows to recover all posts
 */
app.get('/posts', (req, res) => {
    return res.end(JSON.stringify(posts));
});

/**
 * Allows to recover a post
 */
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    var post = posts.filter(post => {
        return post.id == id;
    });
    if (post == null){
        return res.status(400).send({
            success: 'false',
            message: 'post not found'
        });
    }
    return res.end(JSON.stringify(post));
});

// Puts public post directories
app.use('/content', express.static('posts'));

// Scan all posts
var posts = parser.scanPosts();

// Start the server on port 8081
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';
const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, () => {
    console.log("Server api listening at %s:%s", HOSTNAME, PORT);
});

exports.HOSTNAME = HOSTNAME;
exports.PORT = PORT;