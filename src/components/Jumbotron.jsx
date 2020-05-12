import React from 'react';
import waffles from '../assets/waffles.png';
import breakfast from '../assets/breakfast.png';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_MODAL_IS_OPEN } from '../store/action';

export default function Jumbotron() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const handleClick = () => {
    isLoggedIn ? history.push('/writerecipe') : dispatch(SET_MODAL_IS_OPEN(true))
  }

  return (
    <header>
      <h1 className="head-font txt-jumbo mb-2">Pepperpedia</h1>
      <p className="head-font mb-4">Lorem, ipsum dolor.</p>
      <form className="mb-4">
        <div className="input-container">
          <input
            className="minimal-input"
            type="text"
            placeholder="search recipes"
          />
          <div>
            <AiOutlineArrowRight size={30} />
          </div>
        </div>
      </form>
      <button onClick={handleClick} className="minimal-button">write a recipe</button>
      <div id="decoration-left">
        <img src={waffles} alt="left-decor" />
      </div>
      <div id="decoration-right">
        <img src={breakfast} alt="right-decor" />
      </div>
    </header>
  )
}
