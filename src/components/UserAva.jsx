import React from 'react'
import { useSelector } from 'react-redux';

export default function UserAva({ ava, extraClass }) {
  const first_name = useSelector(state => state.userData.first_name);

  return (
    <div className={"profile-picture-wrapper" + (extraClass ? extraClass : "")}>
      {ava === null || ava.length < 1 ? <p className="ava-letter">{first_name[0]}</p> : <img src={ava} alt="ava" />}
    </div>
  )
}
