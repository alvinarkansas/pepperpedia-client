import React, { useState } from 'react';
import waffles from '../assets/waffles.png';
import breakfast from '../assets/breakfast.png';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SET_MODAL_IS_OPEN, SEARCH_RECIPE } from '../store/action';

export default function Jumbotron() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const recipes = useSelector(state => state.recipes);

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleClick = () => {
    isLoggedIn ? history.push('/writerecipe') : dispatch(SET_MODAL_IS_OPEN(true))
  }

  const onChangeSearch = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = recipes.sort().filter(recipe => regex.test(recipe.title));
    }
    setSuggestions(suggestions);
    setSearch(value);
  }

  const onClickSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSuggestions([]);
  }

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(SEARCH_RECIPE(search))
    history.push(`/search?term=${search}`);
  }

  return (
    <header>
      <h1 className="head-font txt-jumbo mb-2">Pepperpedia</h1>
      <p className="head-font mb-4">Lorem, ipsum dolor.</p>
      <form className="mb-4" onSubmit={submitSearch}>
        <div className="input-container" id="main-search">
          <input
            className="minimal-input"
            type="text"
            placeholder="search recipes"
            onChange={onChangeSearch}
            value={search}
          />
          <div>
            <button type="submit">
              <AiOutlineArrowRight size={30} />
            </button>
          </div>
          {
            suggestions.length === 0
              ?
              null
              :
              <ul className="minimal-ul absolute-ul">
                {suggestions.map((suggestion, i) =>
                  <li key={i} onClick={() => { onClickSuggestion(suggestion.title) }}>
                    <p>{suggestion.title}</p>
                  </li>
                )}
              </ul>
          }
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
