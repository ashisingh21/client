import React, { useEffect } from 'react'
import AdminDashboard from './AdminDashboard'
import { useAuth } from '../../Context/Auth'

const CreateCategory = () => {
    const [auth] = useAuth();
    useEffect(() => {

    })
    return (
        <>
            <AdminDashboard>
                <h1>About Admin</h1>
                <table className="table table-bordered table-striped">

                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{auth?.user?.name}</td>

                        </tr>
                        <tr>

                            <td>Email</td>
                            <td>{auth?.user?.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{auth?.user?.phone}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{auth?.user?.address}</td>
                        </tr>
                    </tbody>
                </table>


            </AdminDashboard>
        </>
    )
}

export default CreateCategory