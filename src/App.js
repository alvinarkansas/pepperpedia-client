import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import WriteRecipe from './views/WriteRecipe';
import RecipeDetail from './views/RecipeDetail';
import SearchResult from './views/SearchResult';
import Profile from './views/Profile';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/writerecipe" component={WriteRecipe} />
        <Route path="/detail/:id" component={RecipeDetail} />
        <Route path="/search" component={SearchResult} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
