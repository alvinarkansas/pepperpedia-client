import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { GoPlusSmall } from 'react-icons/go';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_RECIPE } from '../store/action';
import { storage } from '../firebase';
import placeholderpp from '../assets/placeholder-pp.png';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  story: Yup.string()
    .max(255, 'Reached maximum length (255)'),
  title: Yup.string()
    .required("Please enter your recipe's title")
    .min(1, 'Please type something')
})

export default function WriteRecipe() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const addRecipe = (values) => {
    console.log(values);
    const { title, story, serving, cooking_duration, ingredients, steps } = values;
    dispatch(ADD_RECIPE({
      thumbnail: url,
      title,
      story,
      serving,
      cooking_duration,
      ingredients,
      steps
    }));
    history.push('/');
  }

  const changeThumbnail = e => {
    console.log('lalalalala');
    console.log(e.target.files[0]);

    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed',
      (snapshot) => {
        // progress
      },
      (error) => {
        // error
      },
      () => {
        // complete
        storage.ref('images').child(image.name).getDownloadURL()
          .then(url => {
            console.log(url, '<<< URL image firebase');
            setUrl(url);
          })
      })
  }

  return (
    <div className="main-wrapper">
      <Formik
        initialValues={{
          title: '',
          story: '',
          serving: '',
          cooking_duration: '',
          ingredients: [''],
          steps: ['']
        }}
        onSubmit={values => addRecipe(values)}
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
            {image ? <p className="mb-2"> <span style={{ color: '#F4C268' }}>ready to upload </span>{image.name} </p> : null}
            <div className="input-upload-wrapper mb-2">
              <div className="minimal-input-file">
                <input onChange={changeThumbnail} name="thumbnail" className="minimal-input-file" type="file" />
                <label htmlFor="thumbnail">Choose a file</label>
              </div>
              <button className="minimal-button minimal-button-md" onClick={handleUpload}>Upload</button>
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
                  {values.ingredients.map((el, i) =>
                    <div key={i} className="input-container">
                      <input
                        name={`ingredients[${i}]`}
                        className="minimal-input-sm mb-1"
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
                  {values.steps.map((el, i) =>
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

            <div style={{ textAlign: 'center' }}>
              {/* {errors ? <button className="minimal-button disabled-button" disabled>Publish</button> : <button type="submit" className="minimal-button">Publish</button> } */}
              <button type="submit" className="minimal-button">Publish</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
