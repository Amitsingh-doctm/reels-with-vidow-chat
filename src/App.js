import logo from './logo.svg';
import './App.css';
import  Demo  from  './demo.js'
import './App.css';
import Signup from './signup';
import AuthProvider from './contaxt';
import Login from './login';
import Nav from './nav';
import  Home from './home';
import Crd from './Card';
import Signup1 from './signup1';
import Home1  from    './home1'; 
import Feed  from  './feed';
import Profile from "./profile"

import { BrowserRouter as Router, Switch, Route,Link } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav/>  
        <Switch>
        <Route path="/" component={Signup1} exact></Route>
          </Switch>
        <Switch>
          <Route path="/login" component={Crd} exact></Route>
        </Switch> 
        <Switch>
          <Route path="/Home"  component={Feed} exact></Route>
          </Switch>
        <Switch>
          <Route path="/profile" component={Profile} exact></Route>
        </Switch>
        </Router>
    </AuthProvider>
  )
}
export default App;
/*
<Router>
  <CartContext.Provider value={{ cart, setCart }}>
    <Navigation />
    <Switch>
      
      <Route path="/cart" component={Cart}></Route>
    </Switch>
  </CartContext.Provider>
</Router>*/