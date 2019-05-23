import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
export default class App extends React.Component {

  componentDidMount() {
    console.log('mount')
  }

  click() {
    console.log(1)
  }

  render() {
    return (
      <div>
        
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/ssr-test">Home</Link>
                </li>
                <li>
                  <Link to="/ssr-test/about/">About</Link>
                </li>
                <li>
                  <Link to="/ssr-test/users/">Users</Link>
                </li>
              </ul>
            </nav>

            <Route path="/ssr-test" exact component={Index} />
            <Route path="/ssr-test/about/" component={About} />
            <Route path="/ssr-test/users/" component={Users} />
          </div>
      </div>
    )
  }
}
