'use strict'

const http = require('http');
const url = require("url");
const SessionHandler = require('./lib/SessionHandler');
const sessionHandler = new SessionHandler();
const loginPage = require('./pages/login');
const mainPage = require('./pages/main');
const insertPage = require('./pages/insert');
const qs = require('querystring');
const login = {
    user: "n0bisuke",
    pass: "hogehoge"
}

http.createServer((req, res) => {
    if(req.url === '/favicon.ico') return;
    let session = sessionHandler.getSession(req, res);

    //loginフォーム
    if (req.url === '/login' && req.method === 'GET') {
        if(session.name){
            res.writeHead(302, {'Location': '/'});
            res.end();
            return;
        }

        loginPage.get(req,res);
        return;
    }

    //login処理
    if (req.url === '/login' && req.method === 'POST') {
        let body = '';
        req.on('readable', (chunk) => {
            body += req.read();
        });
        req.on('end', () => {
            if(body === '' || body === null) return;
            let mes = '';
            let inputData = qs.parse(body);
            if(inputData.user === login.user && inputData.pass === login.pass){
                //login成功
                session.name = inputData.user;
            }else{
                //login失敗
                mes = 'ログイン失敗';
            }
            res.writeHead(302, {'Location': '/'});
            res.end();
        });
        // loginPage.post(req,res);
        return;
    }

    //トップページ
    if (req.url === '/' && req.method === 'GET') {
        // if (!session.name) {
        //     res.writeHead(200, {'Content-Type': 'text/html'});
        //     res.end('ログインしてください -> <a href="/login">ログインページ</a>');
        //     return;
        // }
        mainPage.get(req,res,session);
        return;
    }

    //トップページ
    if (req.url === '/insert' && req.method === 'POST') {
        // if (!session.name) {
        //     res.writeHead(200, {'Content-Type': 'text/html'});
        //     res.end('ログインしてください -> <a href="/login">ログインページ</a>');
        //     return;
        // }
        insertPage.post(req,res,session);
        return;
    }

    //ログアウト処理
    if (req.url === '/logout' && req.method === 'GET'){
        sessionHandler.deleteSession(session);
        res.writeHead(302, {'Location': '/login'});
        res.end();
    }

}).listen(8080);