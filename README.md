# Marlboro

[![Build Status](https://travis-ci.org/ibigbug/marlboro.png?branch=master)](https://travis-ci.org/ibigbug/marlboro)

## Intro

Marlboro is lightweight static blog generator based on NodeJS, brother of [SBlog](https://github.com/ibigbug/sblog)

## Install

`npm install -g marlboro`

## Usage

1. First time, you may want to run `marlboro` to build a new blog environment:
    --content
    --deploy
    --config.json

2. run `cd content`, write your post in a file with extname '.mkd' 
    note: posts are archived by folder.

    ### For example
    1. `mkdir test`

    2. `cd test`

    3. `touch example.mkd`

    4. `$EDITOR example.mkd`

    <pre>
        ======

        title: Title

        date: 1970-01-01

        tages: seprate, by, comma

        ======

        Content Here

        #Markdown is supported

        ```js
        (function(){})(); // Source Code Here;
        ```
    </pre>

3. back to working space & build site
    run `marlboro` again.

5. a file named 'about.mkd' under 'content' will be recognized to be a short introduction about you. In other word, it's not a 'post'.


[View Online Demo](http://blog.xiaoba.me/marlboro)


## TODO

* disqus
* pages
* test unit
* ...

## LICENSE

The BSD License.

Copyright 2013, YuweiBa
