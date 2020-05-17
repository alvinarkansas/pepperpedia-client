import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { SET_NOTIF_OPEN, SET_NOTIF_MESSAGE } from '../store/action';
import { useDispatch } from 'react-redux';

export default function Notification({ message, open }) {
  const dispatch = useDispatch();

  const closeNotification = () => {
    dispatch(SET_NOTIF_MESSAGE(''))
    dispatch(SET_NOTIF_OPEN(false))
  }

  useEffect(() => {
    const timer = setTimeout(() => dispatch(SET_NOTIF_OPEN(false)), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (open) {
    return (
      <div className="notification">
        <p>{message}</p>
        <div onClick={closeNotification}>
          <IoMdClose size={24} />
        </div>
      </div>
    )
  }

  return null;
}
