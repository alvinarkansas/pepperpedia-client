import React from 'react';

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
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
