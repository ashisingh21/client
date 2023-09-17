import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout'
import { useNavigate, useLocation } from 'react-router-dom'

const Spinner = () => {
    const [count, setCount] = useState(2)
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000);
        count === 0 && navigate('/login', {
            state: location.pathname,
        })
        return () => clearInterval(interval)
    }, [count, navigate, location])

    return (
        <Layout>
            <div style={{ height: '70vh' }} className='d-flex  justify-content-center align-items-center flex-column'>
                <div className="spinner-grow " style={{ width: '3rem', height: '3rem' }} role="status">
                </div>
                <h3>Redirecting you in {count} seconds</h3>
            </div>
        </Layout>
    )
}

export default Spinner