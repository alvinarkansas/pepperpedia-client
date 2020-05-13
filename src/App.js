import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import WriteRecipe from './views/WriteRecipe';
import RecipeDetail from './views/RecipeDetail';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/writerecipe" component={WriteRecipe} />
        <Route path="/detail/:id" component={RecipeDetail} />
      </Switch>
    </Router>
  );
}

export default App;
