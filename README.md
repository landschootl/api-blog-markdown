# api-blog-markdown

[![Build Status](https://travis-ci.org/landschootl/api-blog-markdown.svg?branch=master)](https://travis-ci.org/landschootl/api-blog-markdown)

> API that provides blog posts generated by mardown files 🌐

## Run the server 🔌

* Clone the project `git clone git@github.com:landschootl/api-blog-markdown.git`
* Go in the project `cd api-blog-markdown`
* Install the dependencies `npm install`
* Run the server `node server/server.js`
* Open a browser and go to "http://localhost:3000/"

## Write an post in the blog 📝

* Create a folder in **/posts**
* Create a file named **index.md** in this folder
* Then, copy this content in this file :

```
---
title: my first post
date: "2018-03-20T15:14:32.169Z"
author: your name
---
Your content
```
* Feel free to add some images, medias (see our articles already present)...
* And make your Pull Request !

## Recover all posts 📤

* Run the server _(see the section above)_
* Open a browser and go to "http://localhost:3000/posts" or open terminal and run `curl localhost:3000/posts`

The schema of a post : 
```
{
  title: '',
  path: '',
  date: '',
  author: '',
  markdown: ''
}
```

> Url for test : https://api-blog-markdown.herokuapp.com/posts
