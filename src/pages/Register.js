import React from 'react'
import { useForm } from 'react-hook-form'
import{useDispatch} from "react-redux"
import { signup } from '../redux/slices/userSlice';
import { useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {isAuth}=useSelector(state=>state.user)
  useEffect(()=>{
    if(isAuth){
      navigate("/profile")
    }
  },[isAuth])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    dispatch(signup(data))
    };
  console.log(errors);
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="name" {...register("name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="lastname" {...register("lastname", {required: true, maxLength: 80})} />
      <input type="number" placeholder="age" {...register("age", {required: true, maxLength: 80})} />
      <input type="email" placeholder="email" {...register("email", {required: true, maxLength: 80})} />
      <input type="password" placeholder="password" {...register("password", {required: true, maxLength: 80})} />

      <input type="submit" />
    </form>
    </div>
  )
}

export default Register