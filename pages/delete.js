'use strict';

const fs = require('fs');
const url = require("url");
const qs = require('querystring');
const db = require('../models/db');

const get = (req, res, session) => {
    let queryData = qs.parse(url.parse(req.url).query);
    // console.log(queryData);
    let sql = `delete from dsdb.bbs where id = ${queryData.id}`;
    db(sql,(rows,err)=>{
        if(err){
            console.log(err);
            return;
        }
        res.writeHead(302, {'Location': '/'});
        res.end();
    });
}
const post = (req, res) => {}

module.exports = {get:get,post:post};