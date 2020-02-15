import './App.css';
import React from 'react';
import { Link, Route, Switch ,  BrowserRouter as Router} from 'react-router-dom';
import Home from './module/Home';
import Secret from './module/Secret';
import Login from './module/Login';
/**'/secret' route to only be accessible if the requesting client has a valid token. */
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>        
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={Secret} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
