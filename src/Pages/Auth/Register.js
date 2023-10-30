import React from 'react'
import Layout from '../../Components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Register() {

    const Navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', address: '', answer: '', phone: '', password: '' })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                name: credentials.name,
                email: credentials.email,
                phone: credentials.phone,
                address: credentials.address,
                answer: credentials.answer,
                password: credentials.password
            })
            if (res && res.data.success) {
                toast.success(res.data.message)
                Navigate('/login')

            } else {
                // toast.error(res.data.message)
                // console.log('something went wrong')
                toast.error(res.data.error)
            }
            setCredentials({ ...credentials, [e.target.name]: '' });
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Layout>
            <div className='row'>
                <form className='col-md-4 w-50 m-auto py-4' onSubmit={handleSubmit}>
                    <h2 className='mb-4'>Register</h2>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                        <input type="text" name='phone' onChange={handleChange} value={credentials.phone} className="form-control" id="phone" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" name='address' onChange={handleChange} value={credentials.address} className="form-control" id="address" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Your Bestfriend?</label>
                        <input type="text" name='answer' onChange={handleChange} value={credentials.answer} className="form-control" id="answer" />
                    </div>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register