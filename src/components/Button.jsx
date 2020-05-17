import React from 'react'

export default function Button({ caption, md, extraClass, onClick, submit }) {
  if (md) {
    return (
      <button
        className={"minimal-button " + (md && "minimal-button-md " + (extraClass && extraClass))}
        type={submit === false || submit === null || submit === undefined ? 'button' : 'submit'}
        onClick={onClick}>{caption}
      </button>
    )
  } else {
    return (
      <button
        className={"minimal-button " + (extraClass && extraClass)}
        type={submit === false || submit === null || submit === undefined ? 'button' : 'submit'}
        onClick={onClick}>{caption}
      </button>
    )
  }
}
