import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_LOGGED_IN, SET_USER_DATA, SET_MODAL_IS_OPEN } from '../store/action';
import { useHistory } from 'react-router-dom';

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const modalIsOpen = useSelector(state => state.modalIsOpen);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  // const profile_picture = useSelector(state => state.userData.profile_picture);

  const token = localStorage.getItem('token');
  const profile_picture = localStorage.getItem('profile_picture');

  const signIn = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users/signin", { email, password })
      .then(({ data }) => {
        const { token, first_name, last_name, profile_picture } = data;
        console.log(data);
        dispatch(SET_IS_LOGGED_IN(true));
        dispatch(SET_USER_DATA({
          token,
          first_name,
          last_name,
          profile_picture
        }))
        localStorage.setItem('token', data.token);
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        localStorage.setItem('profile_picture', data.profile_picture);
        dispatch(SET_MODAL_IS_OPEN(false));
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  const signOut = () => {
    localStorage.clear();
    dispatch(SET_IS_LOGGED_IN(false));
  }

  return (
    <>
      {
        isLoggedIn
          ?
          <nav>
            <p>LOGO</p>
            <div>
              <p className="nav-link" onClick={() => history.push('/')}>Discover</p>
              <p className="nav-link" onClick={signOut}>Sign Out</p>
              <div className="profile-picture-wrapper">
                <img src={profile_picture} alt="ava" />
              </div>
            </div>
          </nav>
          :
          <>
            <nav>
              <p>LOGO</p>
              <p className="nav-link" onClick={() => dispatch(SET_MODAL_IS_OPEN(true))}>SIGN IN</p>
            </nav>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => dispatch(SET_MODAL_IS_OPEN(false))}
              className="modal"
              overlayClassName="modal-overlay"
              ariaHideApp={false}
            >
              <div>
                <h2 className="head-font mb-2" style={{ textAlign: 'center' }}>We're glad to see you again!</h2>
                <form className="center-form" onSubmit={signIn}>
                  <input type="email" placeholder="email" className="minimal-input-sm mb-2" onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" placeholder="password" className="minimal-input-sm mb-2" onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" className="minimal-button mb-3">Sign In</button>
                </form>
                <p style={{ textAlign: 'center' }}>First time using Pepperpedia? Sign up here</p>
              </div>
            </Modal>
          </>
      }
    </>
  )
}
