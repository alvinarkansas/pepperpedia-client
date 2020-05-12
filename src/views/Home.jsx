import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPES } from '../store/action';
import Jumbotron from '../components/Jumbotron';
import RecipeCard from '../components/RecipeCard';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);

  useEffect(() => {
    dispatch(FETCH_RECIPES())
  }, [dispatch])

  return (
    <div>
      <Jumbotron />
      <main>
        <h2 className="mb-4">New Recipes</h2>
        <div className="grid-container">
          {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
      </main>
    </div>
  )
}
