import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBook, logout, getAllBooks, deleteBook } from '../redux/slices/adminSlice';
import '../styles/Card.css';
import  loginAdmin  from './LoginAdmin';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'
const Admin = () => {
  
  const dispatch = useDispatch();
  dispatch(loginAdmin());

  const { admindata, isAuth, isLoading } = useSelector((state) => state.admin);
  const posts = useSelector((state) => state.admin.posts);


  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/LoginAdmin');
    } else {
      dispatch(getAllBooks());
    
    }
  }, [isAuth]);

  const [showPopup, setShowPopup] = useState(false); 
  const [selectedBookSummary, setSelectedBookSummary] = useState('');

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  const handleUpdate = (bookId) => {
    if (posts) {
      const selectedBook = posts.find((book) => book._id === bookId);
      if (selectedBook) {
        navigate('/UpdateBook', { state: { book: selectedBook } });
      } else {
        // Handle the case where the book with the given ID was not found in posts
        console.error(`Book with ID ${bookId} not found in posts.`);
      }
    } else {
      // Handle the case where posts is not defined or empty
      console.error('Posts is not defined or empty.');
    }
  };
  

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
      <h1>Welcome, Admin!</h1>
      <div className="navbar">
        <ul>
        <Link to="/admin">Home</Link>
        <Link to="/addBook">Add Books</Link>
       <Link to="/ListUsers">List Users</Link>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </ul>
      </div>
      <div className="card-container">
        {posts && posts.map((post) => (
          <div className="card" key={post._id}>
            {post.image && <img src={post.image} alt={post.bookname} />}
            <p><strong>Book Name:</strong> {post.bookname}</p>
            <p><strong>Description:</strong> {post.description}</p>
            <p><strong>Author:</strong> {post.author}</p>
            <p><strong>Creation Date:</strong> {post.createAt}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <button onClick={() => handleUpdate(post._id)}>Update</button>
            <button onClick={() => openPopup(post.summary)}>View Summary</button>
          </div>
        ))}
      </div>
          


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
  );
};

export default Admin;