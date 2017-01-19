'use strict';

const fs = require('fs');
const qs = require('querystring');
const db = require('../models/db');

const get = (req, res, session) => {}
const post = (req, res) => {
    let body = '';
    req.on('readable', (chunk) => {
        body += req.read();
    });
    req.on('end', () => {
        if(body === '' || body === null) return;

        //POSTデータの取得
        let inputData = qs.parse(body);        
        let username = inputData.username;
        let title = inputData.title;
        let content = inputData.content;
        //insert実行
        let sql = `insert into dsdb.bbs (username,title,content) values ("${username}","${title}","${content}");`;
        db(sql,(rows,err)=>{
            if(err){
                console.log(err);
                return;
            }
            res.writeHead(302, {'Location': '/'});
            res.end();
        });
    });
}

module.exports = {get:get,post:post};