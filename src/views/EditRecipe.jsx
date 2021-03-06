import React, { useState, useEffect } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { GoPlusSmall } from 'react-icons/go';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT_RECIPE, FETCH_RECIPE, FETCH_A_USER, SET_NOTIF_OPEN, SET_NOTIF_MESSAGE, SET_EDIT_RECIPE_LOADING } from '../store/action';
import Button from '../components/Button';
import { storage } from '../firebase';
import placeholderpp from '../assets/placeholder-pp.png';
import * as Yup from 'yup';
import BeatLoader from 'react-spinners/BeatLoader';

const validationSchema = Yup.object().shape({
  story: Yup.string()
    .max(255, 'Reached maximum length (255)'),
  title: Yup.string()
    .required("Please enter your recipe's title")
    .min(1, 'Please type something')
})

export default function WriteRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [url, setUrl] = useState('');
  const recipe = useSelector(state => state.recipe);
  const userId = useSelector(state => state.userData.id);
  const editRecipeLoading = useSelector(state => state.editRecipeLoading);

  useEffect(() => {
    dispatch(FETCH_RECIPE(id));
    setUrl(recipe.thumbnail);
  }, [])

  const editRecipe = (values) => {
    const { title, story, serving, cooking_duration, ingredients, steps } = values;
    dispatch(EDIT_RECIPE({
      thumbnail: url,
      title,
      story,
      serving,
      cooking_duration,
      ingredients,
      steps
    }, id))
      .then(({ data }) => {
        dispatch(FETCH_A_USER(data.UserId));
        dispatch(SET_NOTIF_OPEN(true));
        dispatch(SET_NOTIF_MESSAGE('Changes saved'));
        history.push(`/user/${userId}`);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => dispatch(SET_EDIT_RECIPE_LOADING(false)))
  }

  const changeThumbnail = e => {
    const file = e.target.files[0];

    e.preventDefault();
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progress
      },
      (error) => {
        // error
      },
      () => {
        // complete
        storage.ref('images').child(file.name).getDownloadURL()
          .then(url => {
            setUrl(url);
          })
      })
  }

  return (
    <div className="main-wrapper">
      <Formik
        initialValues={{
          title: recipe.title,
          story: recipe.story,
          serving: recipe.serving,
          cooking_duration: recipe.cooking_duration,
          ingredients: recipe.ingredients,
          steps: recipe.steps
        }}
        onSubmit={values => editRecipe(values)}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <h2 className="head-font-thin mb-1">Title</h2>
            <input name="title" onChange={handleChange} value={values.title} className={"minimal-input-sm mb-2 " + (errors.title ? "has-error" : null)} type="text" placeholder="Your recipe's name" />
            {errors.title ? <p className="error-text">{errors.title}</p> : null}

            <h2 className="head-font-thin mb-1">Thumbnail</h2>
            <div className="placeholder-container mb-2">
              <img src={url || placeholderpp} alt="thumbnail" />
            </div>
            <div className="minimal-input-file mb-2">
              <input onChange={changeThumbnail} name="thumbnail" className="minimal-input-file" type="file" />
              <label htmlFor="thumbnail">Choose a file</label>
            </div>

            <h2 className="head-font-thin mb-1">Description</h2>
            <textarea name="story" onChange={handleChange} value={values.story} className={errors.story ? "mb-2 has-error" : "mb-2"} placeholder="Tell your recipe's background story"></textarea>
            {errors.story ? <p className="error-text">{errors.story}</p> : null}

            <h2 className="head-font-thin mb-1">Serving</h2>
            <input name="serving" onChange={handleChange} value={values.serving} className="minimal-input-sm mb-2" type="text" placeholder="3-4 adult portion" />

            <h2 className="head-font-thin mb-1">Cooking Time</h2>
            <input name="cooking_duration" onChange={handleChange} value={values.cooking_duration} className="minimal-input-sm mb-2" type="text" placeholder="25 minutes" />

            <h2 className="head-font-thin mb-1">Ingredients</h2>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <>
                  {values.ingredients && values.ingredients.map((el, i) =>
                    <div key={i} className="input-container">
                      <input
                        name={`ingredients[${i}]`}
                        className="minimal-input-sm mb-1"
                        type="text"
                        placeholder="100 grams of flour"
                        onChange={handleChange}
                        value={el}
                        maxLength={255}
                      />
                      <div>
                        <IoIosRemoveCircleOutline size={30} onClick={() => remove(i)} />
                      </div>
                    </div>
                  )}
                  <div onClick={() => push('')} className="minimal-button circle-button mb-2">
                    <GoPlusSmall size={25} />
                  </div>
                </>
              )}
            </FieldArray>

            <h2 className="head-font-thin mb-1">Steps</h2>
            <FieldArray name="steps">
              {({ push, remove }) => (
                <>
                  {values.steps && values.steps.map((el, i) =>
                    <div key={i} className="input-container">
                      <div>
                        <div className="step-num"><p>{i + 1}</p></div>
                      </div>
                      <textarea
                        name={`steps[${i}]`}
                        className="mb-1"
                        type="text"
                        placeholder="How to make this recipe?"
                        onChange={handleChange}
                        value={el}
                        maxLength={255}
                      />
                      <div>
                        <IoIosRemoveCircleOutline size={30} onClick={() => remove(i)} />
                      </div>
                    </div>
                  )}
                  <div onClick={() => push('')} className="minimal-button circle-button mb-2">
                    <GoPlusSmall size={25} />
                  </div>
                </>
              )}
            </FieldArray>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <BeatLoader
                size={10}
                margin={5}
                color={"#F4C268"}
                loading={editRecipeLoading}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button caption="Save Changes" submit={true} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
