import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateBook,logout } from '../redux/slices/adminSlice';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
const UpdateBookAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  console.log(book)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const [loading, setLoading] = React.useState(true);

  // Pre-fill the form fields with the book data
  React.useEffect(() => {
    if (book) {
      setValue("bookname", book.bookname);
      setValue("description", book.description);
      setValue("author", book.author);
      setValue("image", book.image);
      setValue("price", book.price);
      setValue("summary", book.summary);
      setLoading(false); // Set loading to false once values are set
    }
  }, [book, setValue]);

  const onSubmit = data => {
    // Send the updated book data to your backend API or Redux store
    dispatch(updateBook({ bookId: book._id, updatedBookInfo: data }));

        console.log("Updated book data:", data);
        console.log(book._id);
    // Handle the update process here
    navigate('/Admin');
    window.location.reload();
  };

  console.log("Form errors:", errors);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="navbar">
        <ul>
        <Link to="/admin">Home</Link>
        <Link to="/addBook">Add Books</Link>
       <Link to="/ListUsers">List Users</Link>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </ul>
      </div>
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="bookname" {...register("bookname", { required: true })} />
        <input type="text" placeholder="description" {...register("description", { required: true })} />
        <input type="text" placeholder="author" {...register("author", { required: true })} />
        <input type="text" placeholder="image" {...register("image", { required: true })} />
        <input type="number" placeholder="price" {...register("price", { required: true })} />
        <input type="text" placeholder="summary" {...register("summary", { required: true })} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateBookAdmin;
