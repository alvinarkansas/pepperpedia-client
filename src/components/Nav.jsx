import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_LOGGED_IN, SET_MODAL_IS_OPEN, SET_USER_DATA, SET_PROMPT_IS_OPEN } from '../store/action';
import { useHistory, Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import UserAva from './UserAva';
import Prompt from './Prompt';
import logo from '../assets/logopad.png';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const profile_picture = useSelector(state => state.userData.profile_picture);
  const id = useSelector(state => state.userData.id);

  const openPrompt = () => {
    dispatch(SET_PROMPT_IS_OPEN(true));
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(SET_IS_LOGGED_IN(false));
    dispatch(SET_USER_DATA({}));
    history.push('/');
  }

  return (
    <>
      {
        isLoggedIn
          ?
          <div className="navbar">
            <img src={logo} alt="logo" style={{ height: '50px', cursor: 'pointer' }} onClick={() => history.push('/')} />
            <input type="checkbox" className="nav-toggle" id="nav-toggle" />
            <nav>
              <ul>
                <li><a href="#recipes" onClick={() => history.push('/')}>Discover</a></li>
                {/* eslint-disable-next-line */}
                <li><a href="#" onClick={() => history.push('/writerecipe')}>Write Recipe</a></li>
                {/* eslint-disable-next-line */}
                <li><a href="#" onClick={openPrompt}>Sign Out</a></li>
                <li>
                  <Link to={`/user/${id}`} style={{ textDecoration: 'none' }}>
                    <UserAva ava={profile_picture} />
                  </Link>
                </li>
              </ul>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
              <AiOutlineMenu size={20} color="#000" />
            </label>
          </div>
          :
          <div className="navbar">
            <img src={logo} alt="logo" style={{ height: '50px', cursor: 'pointer' }} onClick={() => history.push('/')} />
            <input type="checkbox" className="nav-toggle" id="nav-toggle" />
            <nav>
              <ul>
                <li><a href="#recipes" onClick={() => history.push('/')}>Discover</a></li>
                {/* eslint-disable-next-line */}
                <li><a href="#" onClick={() => dispatch(SET_MODAL_IS_OPEN(true))}>Sign In</a></li>
              </ul>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
              <AiOutlineMenu size={20} color="#000" />
            </label>
          </div>
      }
      <AuthModal type="signup" />
      <AuthModal type="signin" />
      <Prompt title="Are you sure you want to sign out?" accept={signOut} />
    </>
  )
}
