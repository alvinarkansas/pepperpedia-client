import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const history = useHistory();
  
  return (
    <div className="recipe-card" onClick={() => history.push(`/detail/${recipe.id}`)}>
      <div className="thumbnail-wrapper">
        <img src={recipe.thumbnail} alt="thumbnail" />
      </div>
      <div className="recipe-description">
        <h2 className="mb-1">{recipe.title}</h2>
        <div>
          <p>{recipe.story}</p>
        </div>
      </div>
    </div>
  )
}
