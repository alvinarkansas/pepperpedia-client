import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_LOGGED_IN, SET_MODAL_IS_OPEN } from '../store/action';
import { useHistory, Link } from 'react-router-dom';
// import { AiOutlineMenu } from 'react-icons/ai';
import AuthModal from './AuthModal';
import UserAva from './UserAva';

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const profile_picture = useSelector(state => state.userData.profile_picture);
  const id = useSelector(state => state.userData.id);

  const signOut = () => {
    localStorage.clear();
    dispatch(SET_IS_LOGGED_IN(false));
    history.push('/');
  }

  return (
    <>
      {
        isLoggedIn
          ?
          <nav>
            <p >LOGO</p>
            <ul>
              <li><a href="#recipes" onClick={() => history.push('/')}>Discover</a></li>
              {/* eslint-disable-next-line */}
              <li><a href="#" onClick={signOut}>Sign Out</a></li>
              <Link to={`/user/${id}`} style={{ textDecoration: 'none' }}>
                <UserAva ava={profile_picture} />
              </Link>
            </ul>
          </nav>
          :
          <>
            <nav>
              <p>LOGO</p>
              <ul>
                <li><a href="#recipes" onClick={() => history.push('/')}>Discover</a></li>
                {/* eslint-disable-next-line */}
                <li><a href="#" onClick={() => dispatch(SET_MODAL_IS_OPEN(true))}>Sign In</a></li>
              </ul>
            </nav>
          </>
      }
      <AuthModal type="signup" />
      <AuthModal type="signin" />
    </>
  )
}
