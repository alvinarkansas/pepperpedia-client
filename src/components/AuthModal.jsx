import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  SET_MODAL_IS_OPEN,
  SET_MODAL_SIGNUP_IS_OPEN,
  SIGN_IN, SIGN_UP,
  SET_AUTH_MESSAGE
} from '../store/action';
import Button from './Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';
// import GoogleLogin from 'react-google-login';
// import axios from 'axios';
// import glogo from '../assets/glogo.png'

const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Please enter your first name"),
  last_name: Yup.string()
    .required("Please enter your last name"),
  emailUp: Yup.string()
    .email('Not a valid email format'),
  passwordUp: Yup.string()
    .min(6, 'Password should at least have 6 characters')
})

export default function AuthModal({ type }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const modalIsOpen = useSelector(state => state.modalIsOpen);
  const modalSignUpIsOpen = useSelector(state => state.modalSignUpIsOpen);
  const authMessage = useSelector(state => state.authMessage);
  const authLoading = useSelector(state => state.authLoading);

  // const onSignInSuccess = (googleUser) => {
  //   console.log(googleUser);
  //   // `googleUser` is the GoogleUser object that represents the just-signed-in user.
  //   // See https://developers.google.com/identity/sign-in/web/reference#users
  //   // const profile = googleUser.getBasicProfile() // etc etc
  //   const token = googleUser.getAuthResponse().id_token;
  //   // dispatch(SET_LOADING(true))
  //   axios({
  //     method: 'post',
  //     url: 'http://localhost:3000/users/googleSignIn',
  //     headers: {
  //       token
  //     }
  //   })
  //     .then(result => {
  //       console.log(result);
  //       // localStorage.setItem("access_token", result.data.access_token);
  //       // localStorage.setItem('name', result.data.name);
  //       // history.push('/dashboard');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     // .finally(_ => {
  //     //   dispatch(SET_LOADING(false))
  //     // })
  // }

  // const onSignInError = (error) => {
  //   // `error` contains any error occurred.
  //   console.log('OH NOES', error)
  // }

  const signIn = e => {
    e.preventDefault();
    dispatch(SIGN_IN({ email, password }));
  }

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const switchModal = () => {
    dispatch(SET_MODAL_IS_OPEN(!modalIsOpen));
    dispatch(SET_MODAL_SIGNUP_IS_OPEN(!modalSignUpIsOpen));
    resetForm();
    dispatch(SET_AUTH_MESSAGE([]));
  }

  const closeModal = () => {
    if (type === 'signin') {
      dispatch(SET_MODAL_IS_OPEN(false));
    } else if (type === 'signup') {
      dispatch(SET_MODAL_SIGNUP_IS_OPEN(false));
    }
    dispatch(SET_AUTH_MESSAGE([]));
  }

  const signUp = (values) => {
    const { first_name, last_name, emailUp, passwordUp } = values;
    dispatch(SIGN_UP({
      first_name,
      last_name,
      email: emailUp,
      password: passwordUp
    }))
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
          {authMessage ? authMessage.map((msg, i) => <p key={i} className="error-text vert-align-center">{msg}</p>) : null}

          <form className="center-form" onSubmit={signIn}>
            <label className="minimal-label">Email</label>
            <input type="email" placeholder="email" className="minimal-input-sm mb-2" onChange={(e) => setEmail(e.target.value)} />
            <label className="minimal-label">Password</label>
            <input type="password" placeholder="password" className="minimal-input-sm mb-2" onChange={(e) => setPassword(e.target.value)} />
            <BeatLoader
              size={10}
              margin={5}
              color={"#F4C268"}
              loading={authLoading}
            />
            <Button caption="Sign In" submit={true} extraClass="mb-3" />
            {/* <p className="mb-1">or maybe you prefer</p>
            <GoogleLogin
              clientId={client_id}
              render={renderProps => (
                <button className="minimal-button mb-3 ghost" onClick={renderProps.onClick} disabled={renderProps.disabled}> <img className="mr-half" src={glogo} width="20px" alt="google logo"/> Google Sign In</button>
              )}
              buttonText="or sign in with Google"
              onSuccess={onSignInSuccess}
              onFailure={onSignInError}
              cookiePolicy={'single_host_origin'}
            /> */}
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
          {authMessage ? authMessage.map((msg, i) => <p key={i} className="error-text vert-align-center">{msg}</p>) : null}

          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              emailUp: '',
              passwordUp: ''
            }}
            onSubmit={values => signUp(values)}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <label className="minimal-label">First Name*</label>
                <input onChange={handleChange} value={values.first_name} name="first_name" type="text" placeholder="first name" className="minimal-input-sm mb-2" />
                {errors.first_name && touched.first_name ? <p className="error-text">{errors.first_name}</p> : null}

                <label className="minimal-label">Last Name*</label>
                <input onChange={handleChange} value={values.last_name} name="last_name" type="text" placeholder="last name" className="minimal-input-sm mb-2" />
                {errors.last_name && touched.last_name ? <p className="error-text">{errors.last_name}</p> : null}

                <label className="minimal-label">Email*</label>
                <input onChange={handleChange} value={values.emailUp} name="emailUp" type="email" placeholder="email" className="minimal-input-sm mb-2" />
                {errors.emailUp ? <p className="error-text">{errors.emailUp}</p> : null}

                <label className="minimal-label">Password*</label>
                <input onChange={handleChange} value={values.passwordUp} name="passwordUp" type="password" placeholder="password" className="minimal-input-sm mb-2" />
                {errors.passwordUp ? <p className="error-text">{errors.passwordUp}</p> : null}

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <BeatLoader
                    size={10}
                    margin={5}
                    color={"#F4C268"}
                    loading={authLoading}
                  />
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <Button caption="Sign Up" submit={true} extraClass="mb-3" />
                </div>
              </Form>
            )}
          </Formik>
          {/* eslint-disable-next-line */}
          <p style={{ textAlign: 'center' }}>Already a member? Try <a href="#" onClick={switchModal}>signing in</a> instead</p>
        </div>
      </Modal>
    )
  }
}
