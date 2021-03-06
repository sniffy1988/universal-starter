import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// Angular 2
import 'angular2-universal-preview/polyfills';
import {
  expressEngine,
  REQUEST_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS
} from 'angular2-universal-preview';

import {provide, enableProdMode} from 'angular2/core';
import {APP_BASE_HREF} from 'angular2/router';

// Application
import {App} from './app/app.component';
import {Html} from './server-only-app/html.component';

let app = express();
let root = path.join(path.resolve(__dirname, '..'));

enableProdMode();

// Express View
app.engine('.html', expressEngine);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());


function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';
  res.render('index', {
    directives: [ Html ],
    providers: [
      provide(APP_BASE_HREF, {useValue: baseUrl}),
      provide(REQUEST_URL, {useValue: url}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: false
  });
}

// Serve static files
app.use(express.static(root, {index: false}));

// Our API for demos only
app.get('/data.json', (req, res) => {
  res.json({
    data: 'fake data'
  });
});

// Routes with html5pushstate
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// Server
app.listen(3000, () => {
  console.log('Listen on http://localhost:3000');
});
