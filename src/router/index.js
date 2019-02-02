const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const router = new Router();

fs.readdirSync(__dirname).filter(file => file !== 'index.js').forEach((file) => {
  const route = require(path.join(__dirname, file)); // eslint-disable-line
  router.use(route.routes()).use(route.allowedMethods());
});


router.get('/', (ctx) => {
  ctx.body = 'ok';
});

module.exports = router;
