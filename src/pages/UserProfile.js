import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { deleteUser } from "../redux/slices/userSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userdata, isAuth, isLoading } = useSelector(state => state.user);

  const handleDeleteUser = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Call the deleteUser action
      dispatch(deleteUser(userdata._id))
        .unwrap()
        .then(response => {
         
          console.log("User deleted successfully");
         
          navigate('/Login');
          dispatch(logout())
          
          
        })
        .catch(error => {
         
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {userdata &&
        <div style={{color:'white'}}>
          <h1>Name: {userdata.name}</h1>
          <h1>Age: {userdata.age}</h1>
          <h1>Email: {userdata.email}</h1>
          <button onClick={handleDeleteUser}>Delete Account</button>
        </div>
      }
    </div>
  );
}

export default UserProfile;
