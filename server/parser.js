var fs = require('fs');

// The url of the directory where the blog posts are
const dirname = process.cwd()+'/posts/';

/**
 * Allows to read all post directory
 * @returns {Array}
 */
function scanPosts(){
    var posts = [];
    console.log('==> Start scan folder posts');
    fs.readdir(dirname, (err, folders) => {
        folders.forEach(nameFolder => {
            var post = scanFilePost(nameFolder);
            posts.push(post);
        });
    });
    console.log('==> Finish scan folders posts');
    return posts;
}

/**
 * Allows to read a post file
 * @param post
 * @param nameFile
 * @returns {{date: string, path: string, author: string, markdown: string, title: string}}
 */
function scanFilePost(nameFolder) {
    var source = dirname+nameFolder+'/index.md';
    var file = fopen(source, "r");
    if (file === false) {
        console.log("Error, can't open post "+nameFolder, source);
        process.exit(1);
    }
    var post = buildPost(file, nameFolder);
    fclose(file);
    return post;
}

/**
 * Allows to build a post object
 * @param file
 * @param namePost
 * @returns {{date: string, path: string, author: string, markdown: string, title: string}}
 */
function buildPost(file, nameFolder){
    var post = {path: '', title: '', date: '', author: '', markdown: ''};
    post.path = '/posts/'+nameFolder+'/';
    var count = 0;
    while (!eof(file)) {
        var line = fgets(file);
        if(line !== false) {
            switch (count) {
                case 0:
                case 4:
                case 5:
                    break;
                case 1:
                    post.title = line.replace("title: ", "");
                    break;
                case 2:
                    post.date = line.replace("date: ", "");
                    break;
                case 3:
                    post.author = line.replace("author: ", "");
                    break;
                default:
                    post.markdown += (count === 6?'':'\n')+line;
            }
        }
        count += 1;
    }
    return post;
}

// Variables that tracks the progress of reading the file
var filePtr = {};
var fileBuffer = {};
var buffer = Buffer.alloc(4096);

/**
 * Allows to open file
 * @param path
 * @param mode
 * @returns {*}
 */
function fopen(path, mode) {
    var handle = fs.openSync(path, mode);
    filePtr[handle] = 0;
    fileBuffer[handle]= [];
    return handle;
}

/**
 * Allows to close a file
 * @param path
 * @param mode
 * @returns {*}
 */
function fclose(handle) {
    fs.closeSync(handle);
    if (handle in filePtr) {
        delete filePtr[handle];
        delete fileBuffer[handle];
    }
    return;
}

/**
 * Allows to read a file
 * @param path
 * @param mode
 * @returns {*}
 */
function fgets(handle) {
    if(fileBuffer[handle].length == 0) {
        var pos = filePtr[handle];
        var br = fs.readSync(handle, buffer, 0, 4096, pos);
        if(br < 4096) {
            delete filePtr[handle];
            if(br == 0) return false;
        }
        var lst = buffer.slice(0, br).toString().split("\n");
        var minus = 0;
        if(lst.length > 1) {
            var x = lst.pop();
            minus = x.length;
        }
        fileBuffer[handle] = lst;
        filePtr[handle] = pos + br - minus;
    }
    return fileBuffer[handle].shift();
}

/**
 * Allows to know if the file still contains a line to read
 * @param handle
 * @returns {boolean}
 */
function eof(handle) {
    return (handle in filePtr) == false;
}

exports.scanPosts = scanPosts;