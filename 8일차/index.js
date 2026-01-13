let server = require('./server')
let router = require('./router')
let reqHandler = require('./reqHandler');
const mariadb = require('./database/connect/mariadb')

mariadb.connect();
server.start(router.route,reqHandler.handle)