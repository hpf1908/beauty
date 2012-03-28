/**
 * Module dependencies.
 */
var page = require('./controllers/page'),
	api  = require('./controllers/api');


exports = module.exports = function(app) {
  //view
  app.get('/', page.index);

  app.get('/like/:page', page.index);

  app.get('/new/:page', page.getNew);

  app.post('/api/dolike',api.like);

  app.get('/show/:id',page.show);

  app.get('/mylike/:page',page.mylike);

  app.get('/fetchItems', api.fetchItems);
};