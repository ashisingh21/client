import React, { useEffect } from 'react'

import { useAuth } from '../../Context/Auth'
import UserDashboard from './UserDashboard';

const AboutUser = () => {
    const [auth] = useAuth();
    useEffect(() => {

    })
    return (
        <>
            <UserDashboard>
                <h1>About User</h1>
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


            </UserDashboard>
        </>
    )
}

export default AboutUser