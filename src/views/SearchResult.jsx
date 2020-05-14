import React from 'react';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { SEARCH_RECIPE } from '../store/action';
import RecipeCard from '../components/RecipeCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  // const dispatch = useDispatch();
  const query = useQuery();
  const term = query.get('term');

  const searchedRecipes = useSelector(state => state.searchedRecipes);
  // const searchError = useSelector(state => state.searchError);

  return (
    <div className="main-wrapper">
      <p className="head-font mb-1" style={{ fontSize: '2rem' }}>{term} recipes</p>
      <p className="mb-2" style={{ fontSize: '.85rem' }}>search results for {term}</p>
      {searchedRecipes.map(recipe =>
        <div className="mb-1">
          <RecipeCard recipe={recipe} wide={true} />
        </div>
      )}
    </div>
  )
}
