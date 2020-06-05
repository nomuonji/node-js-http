'use strict';
const http = require('http');
const pug =require('pug');
const now = new Date();
const server = http.createServer((req,res) => {
    console.info('[' + now + '] Requested by ' + req.connection.remoteAddress);
    res.writeHead(200,{
        'Content-Type':'text/html; charset=utf-8;'
    });

    switch (req.method) {
        case 'GET':
            // const fs = require('fs');
            // const rs = fs.createReadStream('./form.html');
            // rs.pipe(res);
            if (req.url === '/enquetes/yaki-shabu') {
                res.write(pug.renderFile('./form.pug',{
                    path: req.url,
                    firstItem: '焼肉',
                    secondItem: 'しゃぶしゃぶ'
                }));
            } else if (req.url === '/enquetes/rice-bread'){
                res.write(pug.renderFile('./form.pug',{
                    path: req.url,
                    firstItem: 'ごはん',
                    secondItem: 'パン'
                }));
            }
            res.end();
            break;
        case 'POST':
            let rawData = '';
            req.on('data', (chunk) => {
                rawData = rawData + chunk;
            }).on('end',() => {
                const decoded = decodeURIComponent(rawData);
                console.info(`[${now}] 投稿: ${decoded}`);
                res.write('<!DOCTYPE html><html lang="ja"><body><h1>' + decoded + 'が投稿されました</h1></body></html>');
                res.end();
            });
            break;
        case 'DELETE':
            res.write('DELETE　' + req.url);
            res.end();
            break;
        default:
            break;
    }
    
}).on('error',(e) => {
    console.error(`[${new Date()}] Server Error`,e);
}).on('clientError',(e) => {
    console.error(`[${new Date()}] Client Error`,e);
});

const port = process.env.PORT || 8000;
server.listen(port,() => {
    console.log('Listening on' + port);
});