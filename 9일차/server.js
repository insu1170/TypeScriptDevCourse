let http = require('http');
let url = require('url');

const start = (route,handle) => {
    const onRequest = (req, res) => {
        let pathname = url.parse(req.url).pathname
        let qureyData= url.parse(req.url,true).query
        route(pathname, handle, res, qureyData.productId)
    }
    http.createServer(onRequest).listen(8888);
}

exports.start = start