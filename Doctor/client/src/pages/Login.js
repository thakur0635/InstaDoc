import React from 'react'
import "../styles/RegisterStyles.css"
import { Form, Input, message } from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { showloading , hideloading } from '../redux/features/alertSlice'


const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onfinishHandler = async(values) => {
    
    try{
      dispatch(showloading())
      const res = await axios.post("/api/v1/user/login" , values);
      window.location.reload()
      dispatch(hideloading())
      if(res.data.success){
        localStorage.setItem("token" , res.data.token)
        message.success("Login Successfull")
        navigate("/")
      }
      else{
        message.error(res.data.message)
      }
    }
    catch(error){
      dispatch(hideloading())
      console.log(error)
      message.error("Something went wrong")
    }
  }
  return (
    <div className="form-container">
      <Form layout='vertical ' onFinish={onfinishHandler} className='register-form'>
        <h3 className='text-center'>Login</h3>

        <Form.Item label="Email" name="email">
          <Input type='email' required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type='password' required />
        </Form.Item>
        <Link to='/register' className="m-4">New user?</Link>
        <button className='btn btn-primary' type='submit'>Login</button>
      </Form>
    </div>
  )
}

export default Login