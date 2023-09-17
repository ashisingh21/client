import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../Context/Auth'
import Spinner from '../../Components/Spinner'

const Private = () => {
    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const res = await axios.get('http://localhost:8080/api/v1/auth/user-auth', {
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
        ok ? <Outlet></Outlet> : <Spinner></Spinner>
    )
}

export default Private