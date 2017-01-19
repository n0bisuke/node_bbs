'use strict';

const fs = require('fs');
const qs = require('querystring');
const login = {
    user: "n0bisuke",
    pass: "hogehoge"
}

const get = (req, res) => {
    fs.readFile(__dirname + '/login.html', {encoding: 'utf8'}, (err, html) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error!');
        }
        //ファイルの読み込みが成功したらHTMLを返す
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        }
   });
}

const post = (req, res) => {
    let body = '';
    req.on('readable', (chunk) => {
        body += req.read();
    });
    req.on('end', () => {
        if(body === '' || body === null) return;

        let mes = '';
        let inputData = qs.parse(body);
        if(inputData.user === login.user && inputData.pass === login.pass){
            mes = 'ログインしました。';
        }else{
            mes = 'ログイン失敗';
        }

        res.end(mes);
    });
}

module.exports = {get:get,post:post};