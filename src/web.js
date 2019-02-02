const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const path = require('path');
const serve = require('koa-static');
const logger = require('./util/log_util');
const router = require('./router'); // load the router
const middleware = require('./middleware');


const app = new Koa();
module.exports = app;
// body parser
app.use(bodyparser());

// middleware
app.use(middleware);

// serve static
const staticPath = path.join(__dirname, '..', 'dist', 'public');
logger.info(`staticPath: ${staticPath}`);
app.use(serve(staticPath));

// routes
app.use(router.routes()).use(router.allowedMethods());

// error event listening
app.on('error', (err) => {
  logger.info(`server error: ${JSON.stringify(err)}`);
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
logger.info(`server listening on port : ${port}`);
