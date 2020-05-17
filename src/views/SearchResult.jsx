import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SET_SEARCH_ERROR } from '../store/action';
import RecipeCard from '../components/RecipeCard';
import errorillustration from '../assets/errorillustration.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  const query = useQuery();
  const term = query.get('term');
  const dispatch = useDispatch();

  const searchedRecipes = useSelector(state => state.searchedRecipes);
  const searchError = useSelector(state => state.searchError);

  useEffect(() => {
    if (searchedRecipes.length !== 0) {
      dispatch(SET_SEARCH_ERROR(''))
    }
  }, []);

  return (
    <div className="main-wrapper">
      <p className="head-font mb-1" style={{ fontSize: '2rem' }}>{term} recipes</p>
      <p className="mb-2" style={{ fontSize: '.85rem' }}>search results for {term}</p>
      {searchError !== 'No recipes found' && searchedRecipes.map(recipe =>
        <div key={recipe.id} className="mb-3">
          <RecipeCard recipe={recipe} wide={true} />
        </div>
      )}
      {searchError === 'No recipes found'
        ?
        <div className="error-container">
          <img src={errorillustration} alt="no recipes found" />
          <div>
            <h2 className="mb-1" style={{fontSize: '1.25rem'}}>Wow that smells good!</h2>
            <p>but unfortunately we don't have the recipe you're looking for</p>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}
