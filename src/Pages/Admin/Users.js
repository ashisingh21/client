import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../../Context/Auth'


const Users = () => {
    const [auth] = useAuth();
    const [users, setUser] = useState([])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/auth/delete-user/${id}`)
            if (res?.data?.success) {
                toast.success(res.data.message);
                fetchAllUsers()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {
            console.log(error)
        }

    }

    const fetchAllUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/auth/all-user')
            if (res.data.success) {
                setUser(res.data.users)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllUsers()
    }, [])
    return (
        <>
            <AdminDashboard>

                <h1>All Users</h1>
                <div className='row'>

                    {
                        users.filter(u => u.role !== 1).map((u) => (
                            <>
                                <h4>Users</h4>
                                <div className='col-md-4 mb-3'>
                                    <div className="card " >
                                        <div className="card-body">
                                            <table className='table table-bordered table-striped w-100'>
                                                <tbody>
                                                    <tr><td className='w-50'>Name</td>
                                                        <td>{u.name}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>email</td>
                                                        <td>{u.email}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Phone</td>
                                                        <td>{u.phone}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Address</td>
                                                        <td>{u.address}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Role</td>
                                                        <td>{u.role == '0' ? 'User' : 'Admin'}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Action</td>
                                                        <td className='actions-row'><button onClick={() => handleDelete(u._id)} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
                <div className='row'>
                    <div className='col-md-12'>  <h4>Admin</h4></div>
                    {
                        users.filter(u => u.role !== 0).map((u) => (
                            <>

                                <div className='col-md-4 mb-3'>
                                    <div className="card " >
                                        <div className="card-body">
                                            <table className='table table-bordered table-striped w-100'>
                                                <tbody>
                                                    <tr><td className='w-50'>Name</td>
                                                        <td>{u.name}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>email</td>
                                                        <td>{u.email}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Phone</td>
                                                        <td>{u.phone}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Address</td>
                                                        <td>{u.address}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Role</td>
                                                        <td>{u.role == '0' ? 'User' : 'Admin'}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Action</td>
                                                        <td className='actions-row'><button onClick={() => handleDelete(u._id)} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </AdminDashboard>
        </>
    )
}

export default Users