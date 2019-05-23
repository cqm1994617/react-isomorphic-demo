import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
  <BrowserRouter basename="/ssr-test">
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
