import React, { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, getUserProfile } from '../redux/authThunks';
import AccountEdit from '../components/AccountEdit';

function EditProfile() {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) setUserName(user.userName);
  }, [user]);
  
  if (!user) return null; 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ userName }));
  };

  const handleCancel = () => {
    setUserName(user.userName || '');
  };
  
  return (
    <main className="main-profile">
      <h1 className="edit-profile">Edit user info</h1>
      <section className="edit-content">
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper-profile">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrapper-profile">
            <label>First name:</label>
            <input
              type="text"
              value={user.firstName}
              disabled 
            />
          </div>
          <div className="input-wrapper-profile">
            <label>Last name:</label>
            <input
              type="text"
              value={user.lastName}
              disabled 
            />
          </div>
          <div className="button-wrapper-edit">
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
      <AccountEdit
  title="Argent Bank Checking (x8349)"
  amount="$2,082.79"
  description="Available Balance"
/>

<AccountEdit
  title="Argent Bank Savings (x6712)"
  amount="$10,928.42"
  description="Available Balance"
/>

<AccountEdit
  title="Argent Bank Credit Card (x8349)"
  amount="$184.30"
  description="Current Balance"
/>
</main>
  )
}

export default EditProfile
