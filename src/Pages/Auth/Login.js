import React, { useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/Auth';



function Login() {

    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();

    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/login', {
                email: credentials.email,
                password: credentials.password
            })
            if (res && res.data.success) {
                setAuth({ ...auth, user: res.data.user, token: res.data.token })
                localStorage.setItem('auth', JSON.stringify(res.data))
                toast.success(res.data.message);
                navigate(location.state || '/');
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
                <form className='form_Container col-md-4 mt-4 m-auto' onSubmit={handleSubmit}>
                    <h2 className='mb-4'>Login</h2>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link className='forgot-pw' to={'/forgot-password'}> Forgot Password</Link>
                </form>
            </div>
        </Layout>
    )
}

export default Login