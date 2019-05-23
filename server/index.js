import Koa from 'koa'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from "react-router-dom";
import App from '../src/App'
import webpackDev from 'webpack-dev-middleware'
import compiler from '../webpack.config'
import webpack from 'webpack'

const router = new Router()

const app = new Koa()

const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts);
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content;
      },
      setHeader: (name, value) => {
        ctx.set(name, value);
      }
    }, next);
  };
};


router.get('/ssr-test', (ctx, next) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title></title>
      </head>
      <body>
        <div id="app">${renderToString(<StaticRouter location={ctx.req.url} context={{}}><App /></StaticRouter>)}</div>
        <script src="/ssr-test/bundle.js"></script>
      </body>
    </html>
  `

  ctx.body = html
});

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(devMiddleware(webpack(compiler), {
    publicPath: '/ssr-test'
  }))

app.listen(30001)