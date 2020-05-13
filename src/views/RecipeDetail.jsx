import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPE } from '../store/action';
import { IoMdRestaurant, IoMdStopwatch } from 'react-icons/io';

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipe);

  useEffect(() => {
    dispatch(FETCH_RECIPE(id));
  }, [dispatch, id])

  if (recipe.User) {
    return (
      <div className="main-wrapper">
        <div className="detail-page">
          <div className="container-25 mb-2">
            <div className="thumbnail-wrapper square-thumbnail mb-1">
              <img src={recipe.thumbnail} alt="recipe-thumbnail" />
            </div>
            <p className="mb-1" style={{ fontSize: ".9rem", color: 'grey' }}>Recipe by</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="profile-picture-wrapper mr-half">
                <img src={recipe.User.profile_picture} alt="ava" />
              </div>
              <p>{`${recipe.User.first_name} ${recipe.User.last_name}`}</p>
            </div>
          </div>
          <div className="container-75">
            <p className="head-font mb-2" style={{ fontSize: '2rem', fontWeight: '600' }}>{recipe.title}</p>
            <p className="mb-2">{recipe.story}</p>
            <div className="mb-2" style={{ display: 'flex' }}>
              <IoMdStopwatch size={21} className="mr-half" />
              <p className="mr-1">{recipe.cooking_duration}</p>
              <IoMdRestaurant size={21} className="mr-half" />
              <p>{recipe.serving}</p>
            </div>
            <p className="head-font-thin subtitle-underline mb-1" style={{ fontSize: '1.25rem' }}>Ingredients</p>
            <ul className="minimal-ul mb-2">
              {recipe.ingredients && recipe.ingredients.map((ingredient, i) => <li key={i}><p>{ingredient}</p></li>)}
            </ul>
            <p className="head-font-thin subtitle-underline mb-1" style={{ fontSize: '1.25rem' }}>Steps</p>
            <ul className="minimal-ul mb-2">
              {recipe.steps && recipe.steps.map((step, i) =>
                <li style={{ marginBottom: '1rem' }} key={i}>
                  <div>
                    <div className="step-num mr-half"><p>{i + 1}</p></div>
                  </div>
                  <p>{step}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  return null;
}
