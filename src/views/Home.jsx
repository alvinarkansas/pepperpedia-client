import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPES } from '../store/action';
import Jumbotron from '../components/Jumbotron';
import RecipeCard from '../components/RecipeCard';
import Notification from '../components/Notification';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const notifOpen = useSelector(state => state.notifOpen);
  const notifMessage = useSelector(state => state.notifMessage);
  const recipesLoading = useSelector(state => state.recipesLoading);

  useEffect(() => {
    dispatch(FETCH_RECIPES())
  }, [dispatch])

  return (
    <div>
      <Jumbotron />
      <main id="recipes">
        <h2 className="mb-4" style={{ textAlign: 'center' }}>New Recipes</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <BeatLoader
            size={20}
            margin={5}
            color={"#F4C268"}
            loading={recipesLoading}
          />
        </div>
        <div className="grid-container">
          {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </main>
      <Notification message={notifMessage} open={notifOpen} />
    </div>
  )
}
