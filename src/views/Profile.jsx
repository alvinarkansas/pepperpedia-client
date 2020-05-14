import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_USER_RECIPE } from '../store/action';
import RecipeCard from '../components/RecipeCard';

export default function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);
  const userRecipes = useSelector(state => state.userRecipes);

  useEffect(() => {
    dispatch(FETCH_USER_RECIPE(userData.id));
  }, [])

  return (
    <div className="main-wrapper">
      <div className="profile-details mb-2">
        <div className="profile-picture-wrapper bigger mb-2">
          <img src={userData.profile_picture} alt="ava" />
        </div>
        <p style={{ marginBottom: '.5rem' }}>{`${userData.first_name} ${userData.last_name}`}</p>
        <p style={{ textAlign: 'center', fontSize: '.8rem', color: 'grey' }}>{userData.email}</p>
      </div>
      <p className="head-font mb-3" style={{ textAlign: 'center', fontSize: '2.5rem' }}>Your Recipes</p>
      <div className="grid-container">
        {userRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
    </div>
  )
}
