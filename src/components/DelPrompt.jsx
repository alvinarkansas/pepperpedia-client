import React from 'react';
import Button from './Button';
import { SET_DEL_PROMPT_IS_OPEN } from '../store/action';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

export default function Prompt({ title, accept }) {
  const dispatch = useDispatch();

  const delPromptIsOpen = useSelector(state => state.delPromptIsOpen);

  const acceptAction = () => {
    accept();
    dispatch(SET_DEL_PROMPT_IS_OPEN(false));
  }

  const closeModal = () => {
    dispatch(SET_DEL_PROMPT_IS_OPEN(false));
  }

  return (
    <Modal
      isOpen={delPromptIsOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <h2 className="head-font mb-2" style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 300 }}>{title}</h2>
      <span className="prompt-choices">
        <Button caption="Yes" md={true} onClick={acceptAction} />
        <Button caption="No" md={true} extraClass="crimson" onClick={closeModal} />
      </span>
    </Modal>
  )
}
