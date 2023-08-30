import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { signin } from '../redux/slices/userSlice';
import { useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginAdmin.css'
const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAuth, error}=useSelector(state=>state.user)
  useEffect(()=>{
    if(isAuth){
      navigate("/listbooks")
    }
  },[isAuth])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {console.log(data)
    dispatch(signin(data))
 
    };
    console.log(errors)
  return (
    <div>
       <form onSubmit={handleSubmit(onSubmit)}>
       <label >Email</label>
        <input type="email" placeholder="email" id="username" {...register("email", {required: true, maxLength: 80})} />
        <label >Password</label>
        <input type="password" placeholder="password" id="password"{...register("password", {required: true, maxLength: 80})} />
        {error && <p className="error-message">{error.msg}</p>} {/* Display the 'msg' property of the error object */}
      <input type="submit" />
    </form>
    </div>
  )
}

export default Login
