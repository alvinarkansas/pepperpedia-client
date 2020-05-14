import React from 'react';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ recipe, wide }) {
  const history = useHistory();
  const limit = 70;
  const longerLimit = 150;

  if (!wide) {
    return (
      <div className="recipe-card" onClick={() => history.push(`/detail/${recipe.id}`)}>
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description">
          <h3 className="mb-1">{recipe.title}</h3>
          <div>
            {recipe.story.length > limit
              ?
              <p>{`${recipe.story.substr(0, limit)} [ . . . ]`}</p>
              :
              <p>{recipe.story}</p>
            }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="recipe-card wide" onClick={() => history.push(`/detail/${recipe.id}`)}>
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description">
          <h3 className="mb-1">{recipe.title}</h3>
          <div>
            {recipe.story.length > limit
              ?
              <p>{`${recipe.story.substr(0, limit)} [ . . . ]`}</p>
              :
              <p>{recipe.story}</p>
            }
          </div>
        </div>
      </div>
    )
  }

}
