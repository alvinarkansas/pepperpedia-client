import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPES } from '../store/action';
import Jumbotron from '../components/Jumbotron';
import RecipeCard from '../components/RecipeCard';
import Notification from '../components/Notification';
import Button from '../components/Button';
import BeatLoader from 'react-spinners/BeatLoader';

export default function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes);
  const notifOpen = useSelector(state => state.notifOpen);
  const notifMessage = useSelector(state => state.notifMessage);
  const recipesLoading = useSelector(state => state.recipesLoading);

  const [visible, setVisible] = useState(9);

  useEffect(() => {
    dispatch(FETCH_RECIPES())
  }, [dispatch])

  const loadMore = () => {
    let more = visible + 6;
    setVisible(more);
  }

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
        <div className="grid-container mb-2">
          {recipes.slice(0, visible).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
        {recipes.length !== visible && <Button caption="Load More" onClick={loadMore} />}
      </main>
      <Notification message={notifMessage} open={notifOpen} />
    </div>
  )
}
