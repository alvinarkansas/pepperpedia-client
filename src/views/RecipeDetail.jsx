import React, { useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_RECIPE, DELETE_RECIPE, SET_DEL_PROMPT_IS_OPEN, SET_IS_LOGGED_IN, SET_USER_DATA, FETCH_A_USER, SET_NOTIF_OPEN, SET_NOTIF_MESSAGE, SET_DELETE_LOADING } from '../store/action';
import { IoMdRestaurant, IoMdStopwatch } from 'react-icons/io';
import UserAva from '../components/UserAva';
import Button from '../components/Button';
import Prompt from '../components/Prompt';
import DelPrompt from '../components/DelPrompt';
import noThumbnail from '../assets/nothumbnail.png';
import BeatLoader from 'react-spinners/BeatLoader';
import moment from 'moment';

export default function RecipeDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const recipe = useSelector(state => state.recipe);
  const userId = useSelector(state => state.userData.id);
  const deleteLoading = useSelector(state => state.deleteLoading);

  useEffect(() => {
    dispatch(FETCH_RECIPE(id));
  }, [dispatch, id])

  const deleteRecipe = () => {
    dispatch(DELETE_RECIPE(id, userId))
      .then(({ data }) => {
        dispatch(FETCH_A_USER(userId))
        console.log('[Successfully Deleted A Recipe > > > ] ', data);
        dispatch(SET_NOTIF_OPEN(true));
        dispatch(SET_NOTIF_MESSAGE('Recipe deleted'));
        history.push(`/user/${userId}`);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => dispatch(SET_DELETE_LOADING(false)))
  }

  const redirToEditPage = () => {
    history.push(`/editrecipe/${id}`)
  }

  const openDelPrompt = () => {
    dispatch(SET_DEL_PROMPT_IS_OPEN(true));
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(SET_IS_LOGGED_IN(false));
    dispatch(SET_USER_DATA({}));
    history.push('/');
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
            <p className="mb-1" style={{ fontSize: ".9rem", color: 'grey' }}>published {moment(recipe.createdAt).format('MMMM Do YYYY')}</p>
            {recipe.UserId === userId &&
              <>
                <BeatLoader
                  size={10}
                  margin={5}
                  color={"#F4C268"}
                  loading={deleteLoading}
                />
                <Button caption="Delete Recipe" md={true} extraClass="crimson mb-1" onClick={openDelPrompt} />
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
        <DelPrompt title="Delete this recipe?" accept={deleteRecipe} />
        <Prompt title="Are you sure you want to sign out?" accept={signOut} />
      </main>
    )
  }
  return null;
}
