import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_A_USER, SET_MODAL_EDIT_IS_OPEN } from '../store/action';
import RecipeCard from '../components/RecipeCard';
import UserAva from '../components/UserAva';
import EditModal from '../components/EditModal';
import { useParams } from 'react-router-dom';
import { GoPencil } from 'react-icons/go';
import { MdLocationOn } from 'react-icons/md';
import { IconContext } from "react-icons";

export default function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = useSelector(state => state.userData);
  const aUser = useSelector(state => state.aUser);
  const { user, userRecipe } = aUser;

  useEffect(() => {
    console.log('user id >>>> ', id);
    dispatch(FETCH_A_USER(id))
  }, [])

  return (
    <div className="main-wrapper">
      {user &&
        <div className="profile-details mb-2">
          <UserAva ava={user.profile_picture} extraClass=" bigger mb-2" />
          <p style={{ marginBottom: '.5rem', position: 'relative', fontWeight: '500', fontSize: '1.1rem' }}>{`${user.first_name} ${user.last_name}`}
            <span style={{ position: 'absolute', top: 0, right: '-2rem', cursor: 'pointer' }} onClick={() => dispatch(SET_MODAL_EDIT_IS_OPEN(true))}>
              <GoPencil size={18} color="grey" />
            </span>
          </p>
          {user.location &&
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '.5rem' }}>
              <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <MdLocationOn size={16} color="grey" />
              </IconContext.Provider>
              <p style={{ textAlign: 'center', fontSize: '.8rem', color: 'grey' }}>{user.location}</p>
            </div>
          }
          {user.bio && <p className="italic mb-1">{user.bio}</p>}
        </div>
      }
      {userRecipe &&
        <>
          <p className="head-font mb-3" style={{ textAlign: 'center', fontSize: '1.5rem' }}>
            {user.id === userData.id
              ?
              'My Recipes'
              :
              `${userRecipe.length} Recipes`
            }
          </p>
          <div style={{ paddingRight: '4rem', paddingLeft: '4rem' }}>
            {userRecipe.map(recipe =>
              <div key={recipe.id} className="mb-2">
                <RecipeCard recipe={recipe} wide={true} />
              </div>
            )}
          </div>
        </>
      }
      <EditModal />
    </div>
  )
}
