import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import UserAva from './UserAva';
import { SET_MODAL_EDIT_IS_OPEN, EDIT_PROFILE } from '../store/action';
import { storage } from '../firebase';

export default function EditModal() {
  const dispatch = useDispatch();

  const modalEditIsOpen = useSelector(state => state.modalEditIsOpen);
  const userData = useSelector(state => state.userData);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [ava, setAva] = useState('');

  useEffect(() => {
    setFirstName(userData.first_name);
    setLastName(userData.last_name);
    setLocation(userData.location);
    setBio(userData.bio);
    setAva(userData.profile_picture);
  }, [])

  const closeModal = () => {
    dispatch(SET_MODAL_EDIT_IS_OPEN(false));
  }

  const saveChanges = () => {
    dispatch(EDIT_PROFILE({
      first_name,
      last_name,
      location,
      bio,
      profile_picture: ava
    }));
    closeModal();
  }

  const handleEditAva = e => {
    const file = e.target.files[0];
    console.log(file);
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
            console.log(url, '<<< URL image firebase');
            setAva(url);
          })
      })
  }

  return (
    <div>
      <Modal
        isOpen={modalEditIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <div>
          <div style={{ position: 'relative' }}>
            <UserAva ava={ava ? ava : userData.profile_picture} extraClass=" bigger mb-2" />
            <div className="ava-input">
              <input type="file" className="ava-input" onChange={handleEditAva} />
            </div>
          </div>
          <form className="center-form">
            <label className="minimal-label">First Name</label>
            <input type="text" placeholder="first name" className="minimal-input-sm mb-2" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
            <label className="minimal-label">Last Name</label>
            <input type="text" placeholder="last name" className="minimal-input-sm mb-2" value={last_name} onChange={(e) => setLastName(e.target.value)} />
            <label className="minimal-label">Location</label>
            <input type="text" placeholder="your current location" className="minimal-input-sm mb-2" value={location} onChange={(e) => setLocation(e.target.value)} />
            <label className="minimal-label">Bio</label>
            <input type="text" placeholder="how would you describe yourself?" className="minimal-input-sm mb-2" value={bio} onChange={(e) => setBio(e.target.value)} />
            <button type="submit" className="minimal-button mb-1" onClick={saveChanges}>Save Changes</button>
            <button type="submit" className="minimal-button mb-3" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
