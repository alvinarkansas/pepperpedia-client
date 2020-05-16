import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { SET_MODAL_IS_OPEN, SET_MODAL_SIGNUP_IS_OPEN, SIGN_IN, SIGN_UP } from '../store/action';

export default function AuthModal({ type }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const modalIsOpen = useSelector(state => state.modalIsOpen);
  const modalSignUpIsOpen = useSelector(state => state.modalSignUpIsOpen);

  const signIn = e => {
    e.preventDefault();
    dispatch(SIGN_IN({ email, password }));
  }

  const signUp = e => {
    e.preventDefault();
    dispatch(SIGN_UP({
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }))
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  const switchModal = () => {
    dispatch(SET_MODAL_IS_OPEN(!modalIsOpen));
    dispatch(SET_MODAL_SIGNUP_IS_OPEN(!modalSignUpIsOpen));
    resetForm();
  }

  const closeModal = () => {
    type === 'signin' ? dispatch(SET_MODAL_IS_OPEN(false)) : dispatch(SET_MODAL_SIGNUP_IS_OPEN(false));
    resetForm();
  }

  if (type === 'signin') {
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
          {/* eslint-disable-next-line */}
          <p style={{ textAlign: 'center' }}>First time using Pepperpedia? Sign up <a href="#" onClick={switchModal}>here</a></p>
        </div>
      </Modal>
    )
  } else if (type === 'signup') {
    return (
      <Modal
        isOpen={modalSignUpIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div>
          <h2 className="head-font mb-2" style={{ textAlign: 'center' }}>Get started!</h2>
          <form className="center-form" onSubmit={signUp}>
            <label className="minimal-label">First Name</label>
            <input type="text" placeholder="first name" className="minimal-input-sm mb-2" onChange={(e) => setFirstName(e.target.value)} />
            <label className="minimal-label">Last Name</label>
            <input type="text" placeholder="last name" className="minimal-input-sm mb-2" onChange={(e) => setLastName(e.target.value)} />
            <label className="minimal-label">Email</label>
            <input type="email" placeholder="email" className="minimal-input-sm mb-2" onChange={(e) => setEmail(e.target.value)} />
            <label className="minimal-label">Password</label>
            <input type="password" placeholder="password" className="minimal-input-sm mb-2" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="minimal-button mb-3">Sign Up</button>
          </form>
          {/* eslint-disable-next-line */}
          <p style={{ textAlign: 'center' }}>Already a member? Try <a href="#" onClick={switchModal}>signing in</a> instead</p>
        </div>
      </Modal>
    )
  }
}
