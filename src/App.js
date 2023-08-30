import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './component/Navbar';
import LoginAdmin from './pages/LoginAdmin';
import Admin from './pages/Admin';
import AddBookAdmin from './pages/AddBookAdmin';
import UpdateBookAdmin from './pages/UpdateBookAdmin';
import UserProfile from './pages/UserProfile';
import ListUsers from './pages/ListUsers';

function App() {
  const location = useLocation(); // Get the current location

  const hiddenNavbarRoutes = ['/LoginAdmin', '/ListUsers' ,'/admin', '/addBook', '/UpdateBook']; // Include Admin route here

  // Check if the current route is in the hiddenNavbarRoutes array
  const shouldDisplayNavbar = !hiddenNavbarRoutes.includes(location.pathname);
  
  return (
    <div className="App">
      {shouldDisplayNavbar && <Navbar />} 
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/listbooks" element={<Profile />} /> 
        <Route path="/LoginAdmin" element={<LoginAdmin />} /> 
        <Route path="/Admin" element={<Admin />} /> 
        <Route path="/AddBook" element={<AddBookAdmin />} /> 
        <Route path="/UpdateBook" element={<UpdateBookAdmin />} /> 
        <Route path="/Userprofile" element={<UserProfile />} /> 
        <Route path="/ListUsers" element={<ListUsers />} /> 
      </Routes>
    </div>
  );
}

export default App;
