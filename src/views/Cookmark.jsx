import React, { useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import { useSelector, useDispatch } from 'react-redux';
import { FETCH_COOKMARKS } from '../store/action';
import Notification from '../components/Notification';

export default function Cookmark() {
  const dispatch = useDispatch();

  const cookmarks = useSelector(state => state.cookmarks);
  const notifOpen = useSelector(state => state.notifOpen);
  const notifMessage = useSelector(state => state.notifMessage);

  useEffect(() => {
    dispatch(FETCH_COOKMARKS());
  }, [])

  return (
    <div className="main-wrapper">
      <h2 className="mb-4 head-font" style={{ textAlign: 'center' }}>Your Cookmarks</h2>
      {cookmarks.length < 1
        ?
        <p style={{ textAlign: 'center', fontSize: '.85rem', marginBottom: '1rem' }}>You have no cookmark yet</p>
        :
        <div className="grid-container mb-2">
          {cookmarks.map(cookmark => <RecipeCard key={cookmark.id} recipe={cookmark.Recipe} />)}
        </div>
      }
      <Notification message={notifMessage} open={notifOpen} />
    </div>
  )
}
