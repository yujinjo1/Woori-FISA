const express = require('express');
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors()); // 모든 origin 허용 (테스트 용도)

app.get('/:file', (HTTPRequest, HTTPResponse) => {
    console.log(HTTPRequest.params.file);
    HTTPResponse.sendFile(path.resolve( __dirname, HTTPRequest.params.file ));
});

app.get('/:dir/:file', (HTTPRequest, HTTPResponse) => {
    HTTPResponse.sendFile(path.resolve( __dirname, HTTPRequest.params.dir, HTTPRequest.params.file));
} );

app.get('/:delay/:dir/:file', (HTTPRequest, HTTPResponse) => {
    setTimeout(() => {
        HTTPResponse.sendFile(path.resolve( __dirname, HTTPRequest.params.dir, HTTPRequest.params.file));
    }, Number(HTTPRequest.params.delay));
} );


const port = 3000;
app.listen(port, () => console.log(`http://localhost:${port}/ app listening on port ${port}`));