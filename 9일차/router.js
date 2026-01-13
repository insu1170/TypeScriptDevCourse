const route = (pathName, handle, res) => {
    console.log('pathname:' + pathName)

    if (typeof handle[pathName] == 'function') {
        handle[pathName](res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write('Not Found');
        res.end()
    }

}

exports.route = route