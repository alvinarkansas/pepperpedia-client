import React from 'react';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { SEARCH_RECIPE } from '../store/action';
import RecipeCard from '../components/RecipeCard';
import errorimg from '../assets/errorimg.png';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  const query = useQuery();
  const term = query.get('term');

  const searchedRecipes = useSelector(state => state.searchedRecipes);
  const searchError = useSelector(state => state.searchError);

  return (
    <div className="main-wrapper">
      <p className="head-font mb-1" style={{ fontSize: '2rem' }}>{term} recipes</p>
      <p className="mb-2" style={{ fontSize: '.85rem' }}>search results for {term}</p>
      {searchedRecipes.map(recipe =>
        <div key={recipe.id} className="mb-3">
          <RecipeCard recipe={recipe} wide={true} />
        </div>
      )}
      {searchError === 'No recipes found'
        ?
        // illustration error
        <div className="placeholder-container mb-2">
          <img src={errorimg} alt="no recipes found" />
        </div>
        :
        null
      }
    </div>
  )
}
