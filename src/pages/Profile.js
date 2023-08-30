import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { getAllBooks } from '../redux/slices/userSlice';
import '../styles/Card.css';

const Profile = () => {
  const dispatch=useDispatch()
  const {userdata,isAuth,isLoading}=useSelector(state=>state.user)
  const posts = useSelector((state) => state.admin.posts);
  console.log(posts)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!isAuth){
      navigate("/login")
    }
    else {
      dispatch(getAllBooks());
      console.log(getAllBooks); // Now you are logging the destructured 'posts' array
    }
  },[isAuth])
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [selectedBookSummary, setSelectedBookSummary] = useState(''); // State to store selected book's summar
  
  // open the popup
  const openPopup = (summary) => {
    setSelectedBookSummary(summary);
    setShowPopup(true);
  };

  // close the popup
  const closePopup = () => {
    setSelectedBookSummary('');
    setShowPopup(false);
  };
  return (
    <div>
      {userdata &&
      <div>
    
        <div className="card-container">
        {posts && posts.map((post, index) => (
          <div className="card" key={post._id}>
            {post.image && <img src={post.image} alt={post.bookname} />}
            <p><strong>Book Name:</strong> {post.bookname}</p>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Creation Date:</strong> {post.createAt}</p>
            <button onClick={() => openPopup(post.summary)}>View Summary</button>
          </div>
        ))}
      </div>
      </div>
      
      }
       <button onClick={()=>dispatch(logout())}>logout</button>
        {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2>Book Summary</h2>
            <p>{selectedBookSummary}</p>
          </div>
        </div>
        )}
    </div>
  )
}

export default Profile