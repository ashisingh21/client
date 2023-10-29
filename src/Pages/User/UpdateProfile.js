import React from 'react'

import { useAuth } from '../../Context/Auth'
import UserDashboard from './UserDashboard';
import AdminDashboard from '../Admin/AdminDashboard'
import UpdateProfileForm from '../../Components/UpdateProfileForm';

const UpdateProfile = () => {
    const [auth, setAuth] = useAuth();
    return (
        <>

            {auth?.user.role == 0 ? <>   <UserDashboard>

                <UpdateProfileForm></UpdateProfileForm>

            </UserDashboard></> : <>   <AdminDashboard>

                <UpdateProfileForm></UpdateProfileForm>

            </AdminDashboard></>}

        </>
    )
}

export default UpdateProfile