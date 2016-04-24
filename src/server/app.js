'use strict';

import koa from 'koa';
const app = koa();

var views = require('co-views');
var render = views(__dirname + '/views', { ext: 'ejs' });

let isAppStarted = false;
app.start = () => {
	if(!isAppStarted) {
        isAppStarted = true;

		app.use(function *() {
			console.log('tatata');
			this.body = yield render('index');
		});

		app.listen(3000);  
    }
}

if (!module.parent) {
    try {
        app.start();
    } catch(e) {}
}

export default app;
