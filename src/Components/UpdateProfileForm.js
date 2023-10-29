import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/Auth';
import { toast } from 'react-toastify';

const UpdateProfileForm = () => {
    const [auth, setAuth] = useAuth();

    const [credentials, setCredentials] = useState({ name: '', email: '', address: '', phone: '', password: '' })

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const fetchUser = async () => {
        setCredentials({ name: auth?.user.name, email: auth?.user.email, address: auth?.user.address, phone: auth?.user.phone })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/auth/update`, {
                name: credentials.name,
                email: credentials.email,
                phone: credentials.phone,
                address: credentials.address,
                password: credentials.password
            })
            if (res?.data?.success) {
                setAuth({ ...auth, user: res.data.user })
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = res.data.user;
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success(res.data.message)
                // setCredentials({ ...credentials, [e.target.name]: '' });
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className='row'>
            <form className='col-md-4 w-100 py-4' onSubmit={handleSubmit}>
                <h2 className='mb-4'>Update Profile</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" name='name' onChange={handleChange} value={credentials.name} className="form-control" id="name" />

                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name='email' onChange={handleChange} value={credentials.email} className="form-control" id="email" readOnly />

                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" name='phone' onChange={handleChange} value={credentials.phone} className="form-control" id="phone" />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' onChange={handleChange} value={credentials.password} className="form-control" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                    <input type="text" name='address' onChange={handleChange} value={credentials.address} className="form-control" id="address" />
                </div>

                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateProfileForm