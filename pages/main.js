'use strict';

const fs = require('fs');
const qs = require('querystring');
const db = require('../models/db');

const get = (req, res, session) => {
    console.log('main');
//     fs.readFile(__dirname + '/login.html', {encoding: 'utf8'}, (err, html) => {
//         if (err) {
//             res.statusCode = 500;
//             res.end('Error!');
//         }
//         //ファイルの読み込みが成功したらHTMLを返す
//         else {
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.end(html);
//         }
//    });

    let sql = `select * from dsdb.bbs`;
    db(sql,(rows)=>{
        let body = '';
        for(let i = 0,len=rows.length; i<len; i++){
            console.log(rows[i].title);
            body += `<hr>ID:${rows[i].id} タイトル:${rows[i].title} 内容: ${rows[i].content} <br/>`;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`ログイン成功 \n いらっしゃい ${session.name}さん<br />
            <form method="post" action="/insert">
                <p>ユーザー名:<input type="text" name="username"></p>
                <p>タイトル:<input type="text" name="title"></p>
                <p>内容:<input type="text" name="content"></p>
                <input type="hidden" name="hoge">
                <p><input type="submit"></p>
            </form>
            ${body}
            <a href="/logout">ログアウト</a>
        `);
        console.log(rows);
    });

}

const post = (req, res) => {}

module.exports = {get:get,post:post};