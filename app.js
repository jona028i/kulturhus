const restify = require('restify');
const logger = require('morgan');
const corsmiddleware = require('restify-cors-middleware');

const server = restify.createServer({
	'name': 'kultur',
	'version': '1.0.0'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.bodyParser({
	mapParamp: true,
	mapFiles: true
}));

restify.defaultResponseHeaders = false;
const cors = corsmiddleware({
	origins: ['*'],
	header: ['Access-Control-Allow-Origin']
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(logger('dev'));

require('./routes/getAll')(server);
require('./routes/getCat')(server);
require('./routes/getById')(server);
require('./routes/deletebestil')(server);
require('./routes/postSeats')(server);
require('./routes/postBestillinger')(server);

require('./routes/postKontakt')(server);
// require('./routes/afbestilBestilling')(server);
require('./routes/getDataArrengement')(server);
server.listen(3370);