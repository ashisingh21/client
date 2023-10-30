import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../Context/Auth'
import AccessDenied from '../AccessDenied'

const AdminRoute = () => {
    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth', {
                headers: {
                    token: auth?.token
                }
            })
            if (res?.data?.ok) {
                setOk(true);
            } else {
                setOk(false)
            }
        }

        if (auth?.token) checkAuth()


    }, [auth?.token])
    return (
        ok ? <Outlet></Outlet> : <AccessDenied></AccessDenied>
    )
}

export default AdminRoute