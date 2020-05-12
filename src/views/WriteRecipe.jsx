import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_RECIPE } from '../store/action';

export default function WriteRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();

  const addRecipe = (values) => {
    // e.preventDefault();
    // dispatch(ADD_RECIPE());
    console.log(values);
    dispatch(ADD_RECIPE(values));
    history.push('/');
  }

  return (
    <div className="main-wrapper">
      <Formik
        initialValues={{
          thumbnail: '',
          title: '',
          story: '',
          serving: '',
          cooking_duration: '',
          ingredients: [''],
          steps: ['']
        }}
        onSubmit={values => addRecipe(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <h2 className="head-font mb-1">Thumbnail</h2>
            <input name="thumbnail" onChange={handleChange} value={values.thumbnail} className="minimal-input mb-1" type="text" placeholder="Add a photo of your dish" />
            <h2 className="head-font mb-1">Title</h2>
            <input name="title" onChange={handleChange} value={values.title} className="minimal-input mb-1" type="text" placeholder="Your recipe's name" />
            <h2 className="head-font mb-1">Description</h2>
            <textarea name="story" onChange={handleChange} value={values.story} className="mb-1" placeholder="Tell your recipe's background story"></textarea>
            <h2 className="head-font mb-1">Serving</h2>
            <input name="serving" onChange={handleChange} value={values.serving} className="minimal-input mb-1" type="text" placeholder="3-4 adult portion" />
            <h2 className="head-font mb-1">Cooking Time</h2>
            <input name="cooking_duration" onChange={handleChange} value={values.cooking_duration} className="minimal-input mb-1" type="text" placeholder="25 minutes" />
            <h2 className="head-font mb-1">Ingredients</h2>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <>
                  {values.ingredients.map((el, i) =>
                    <div key={i} className="input-container">
                      <input
                        name={`ingredients[${i}]`}
                        className="minimal-input mb-1"
                        type="text"
                        placeholder="100 grams of flour"
                        onChange={handleChange}
                        value={el}
                      />
                      <div>
                        <IoIosRemoveCircleOutline size={30} onClick={() => remove(i)} />
                      </div>
                    </div>
                  )}
                  <button type="button" className="minimal-button mb-3" onClick={() => push('')}>+</button>
                </>
              )}
            </FieldArray>
            <h2 className="head-font mb-1">Steps</h2>
            <FieldArray name="steps">
              {({ push, remove }) => (
                <>
                  {values.steps.map((el, i) =>
                    <div key={i} className="input-container">
                      <input
                        name={`steps[${i}]`}
                        className="minimal-input mb-1"
                        type="text"
                        placeholder="How to make this recipe?"
                        onChange={handleChange}
                        value={el}
                      />
                      <div>
                        <IoIosRemoveCircleOutline size={30} onClick={() => remove(i)} />
                      </div>
                    </div>
                  )}
                  <button type="button" className="minimal-button mb-3" onClick={() => push('')}>+</button>
                </>
              )}
            </FieldArray>
            <div>
              <button type="submit" className="minimal-button">Submit</button>
            </div>
            <pre>
              {JSON.stringify(values, null, 2)}
            </pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}
