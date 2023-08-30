import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/NavBar.css'
const Navbar = () => {
  const dispatch = useDispatch()
  const { isAuth, isAdmin } = useSelector(state => state.user)

  return (
    <div  className="navbar">
     
        {isAuth ? (
          <div>
             <ul>
            <Link to="/listbooks">List of Books</Link>
            <Link to="/Userprofile">Profile</Link>
            {isAdmin && <Link to="/ListUsers">List Users</Link>} {/* Show ListUsers link only if the user is an admin */}
            <button onClick={() => dispatch(logout())}>Logout</button>
            </ul>
          </div>
        ) : (
          <div>
            <ul className='register_login'>
            <Link to="/Register">Register</Link>
            <Link to="/Login">Login</Link>
            </ul>
          </div>
        )}
      
    </div>
  )
}

export default Navbar
