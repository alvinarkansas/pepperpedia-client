import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import WriteRecipe from './views/WriteRecipe';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/writerecipe" component={WriteRecipe} />
      </Switch>
    </Router>
  );
}

export default App;
