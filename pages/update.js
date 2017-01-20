'use strict';

const fs = require('fs');
const url = require("url");
const qs = require('querystring');
const db = require('../models/db');

const get = (req, res, session) => {
    let queryData = qs.parse(url.parse(req.url).query);
    let sql = `select * from dsdb.bbs where id = ${queryData.id}`;
    db(sql,(rows,err)=>{
        console.log(rows);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`更新<br />
                <form method="post" action="/update">
                    <p>ユーザー名:<input type="text" name="username" value="${rows[0].username}"></p>
                    <p>タイトル:<input type="text" name="title" value="${rows[0].title}"></p>
                    <p>内容:<input type="text" name="content" value="${rows[0].content}"></p>
                    <input type="hidden" name="id" value="${rows[0].id}">
                    <input type="hidden" name="hoge">
                    <p><input type="submit"></p>
                </form>
        `);
    });
}

const post = (req, res) => {
    let body = '';
    req.on('readable', (chunk) => {
        body += req.read();
    });
    req.on('end', () => {
        if(body === '' || body === null) return;

        //POSTデータの取得
        let inputData = qs.parse(body);       
        let id = inputData.id;
        let username = inputData.username;
        let title = inputData.title;
        let content = inputData.content;
        //insert実行
        let sql = `update dsdb.bbs set username="${username}",title="${title}",content="${content}" where id = ${id};`;
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