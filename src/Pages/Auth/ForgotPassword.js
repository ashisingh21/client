import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/Auth';


const ForgotPassword = () => {

  const [auth, setAuth] = useAuth()
  const Navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '', answer: '' })
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email: credentials.email,
        answer: credentials.answer,
        password: credentials.password
      })
      if (res && res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token })
        localStorage.setItem('auth', JSON.stringify(res.data))
        Navigate('/');
        toast.success(res.data.message);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <Layout>
      <div className='row'>
        <form className='form_Container col-md-4 mt-4  m-auto' onSubmit={handleSubmit}>
          <h2 className='mb-4'>Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Who is your best friend?</label>
            <input type="answer" name='answer' onChange={handleChange} value={credentials.answer} className="form-control" id="answer" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword