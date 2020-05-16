import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import WriteRecipe from './views/WriteRecipe';
import RecipeDetail from './views/RecipeDetail';
import SearchResult from './views/SearchResult';
import Profile from './views/Profile';
import EditRecipe from './views/EditRecipe';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/detail/:id" component={RecipeDetail} />
        <Route path="/search" component={SearchResult} />
        <Route path="/user/:id" component={Profile} />
        <ProtectedRoute path="/writerecipe" component={WriteRecipe} isLoggedIn={isLoggedIn} />
        <ProtectedRoute path="/editrecipe/:id" component={EditRecipe} isLoggedIn={isLoggedIn} />
        <Route exact component={NotFound} />
      </Switch>
    </Router>
  );
}

function ProtectedRoute({ isLoggedIn, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={
        props => isLoggedIn
          ?
          (<Component {...props} />)
          :
          (<Redirect to={{ pathname: '/' }} />)
      }
    />
  )
}

function NotFound() {
  return (
    <div className="main-wrapper">
      <h2>
        404 Not Found
      </h2>
    </div>
  )
}

export default App;
