import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPE, DELETE_RECIPE, SET_PROMPT_IS_OPEN } from '../store/action';
import { IoMdRestaurant, IoMdStopwatch } from 'react-icons/io';
import UserAva from '../components/UserAva';
import Button from '../components/Button';
import Prompt from '../components/Prompt';
import noThumbnail from '../assets/nothumbnail.png';

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipe = useSelector(state => state.recipe);
  const userId = useSelector(state => state.userData.id);

  useEffect(() => {
    dispatch(FETCH_RECIPE(id));
  }, [dispatch, id])

  const deleteRecipe = () => {
    dispatch(DELETE_RECIPE(id, userId));
    history.push(`/user/${userId}`);
  }

  const redirToEditPage = () => {
    history.push(`/editrecipe/${id}`)
  }

  const openPrompt = () => {
    dispatch(SET_PROMPT_IS_OPEN(true));
  }

  if (recipe.User) {
    return (
      <main>
        <div className="detail-page">
          <div className="container-25 mb-2">
            <div className="thumbnail-wrapper square-thumbnail mb-1">
              <img src={recipe.thumbnail || noThumbnail} alt="recipe-thumbnail" />
            </div>
            <p className="mb-1" style={{ fontSize: ".9rem", color: 'grey' }}>Recipe by</p>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="mb-1">
              <Link to={`/user/${recipe.UserId}`} style={{ textDecoration: 'none' }}>
                <UserAva ava={recipe.User.profile_picture} extraClass=" mr-half" />
              </Link>
              <p>{`${recipe.User.first_name} ${recipe.User.last_name}`}</p>
            </div>
            {recipe.UserId === userId &&
              <>
                <Button caption="Delete Recipe" md={true} extraClass="crimson mb-1" onClick={openPrompt} />
                <Button caption="Edit Recipe" md={true} extraClass="mb-1" onClick={redirToEditPage} />
              </>
            }
          </div>
          <div className="container-75">
            <p className="head-font mb-2" style={{ fontSize: '2rem', fontWeight: '600' }}>{recipe.title}</p>
            {recipe.story && <p className="mb-2">{recipe.story}</p>}
            <div className="mb-2" style={{ display: 'flex' }}>
              {recipe.cooking_duration &&
                <>
                  <IoMdStopwatch size={21} className="mr-half" />
                  <p className="mr-1">{recipe.cooking_duration}</p>
                </>
              }
              {recipe.serving &&
                <>
                  <IoMdRestaurant size={21} className="mr-half" />
                  <p>{recipe.serving}</p>
                </>
              }
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
        <Prompt title="Delete this recipe?" accept={deleteRecipe} />
      </main>
    )
  }
  return null;
}
