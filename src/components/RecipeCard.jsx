import React from 'react';
import { useHistory } from 'react-router-dom';
import noThumbnail from '../assets/nothumbnail.png';

export default function RecipeCard({ recipe, wide }) {
  const history = useHistory();
  const limit = 70;
  const longerLimit = 200;

  if (!wide) {
    return (
      <div className="recipe-card" onClick={() => history.push(`/detail/${recipe.id}`)}>
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail || noThumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description">
          <h3 className="mb-1">{recipe.title}</h3>
          {recipe.story === "" ?
            <div>
              <p>No description provided</p>
            </div>
            :
            <div>
              {recipe.story.length > limit
                ?
                <p>{`${recipe.story.substr(0, limit)} [ . . . ]`}</p>
                :
                <p>{recipe.story}</p>
              }
            </div>
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="recipe-card wide" onClick={() => history.push(`/detail/${recipe.id}`)}>
        <div className="thumbnail-wrapper">
          <img src={recipe.thumbnail || noThumbnail} alt="thumbnail" />
        </div>
        <div className="recipe-description" style={{ position: 'relative' }}>
          <h3 className="mb-1 head-font">{recipe.title}</h3>
          <div>
            {recipe.story.length > longerLimit
              ?
              <p>{`${recipe.story.substr(0, longerLimit)} [ . . . ]`}</p>
              :
              <p>{recipe.story}</p>
            }
          </div>
        </div>
      </div>
    )
  }

}
