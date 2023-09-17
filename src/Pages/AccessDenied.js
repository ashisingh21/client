import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Link } from 'react-router-dom'

const AccessDenied = () => {
    return (
        <Layout>
            <div style={{ height: '70vh' }} className=' flex-column d-flex justify-content-center align-items-center'>
                <h1>Access Denied</h1><br></br>
                <h3>Go to <Link to="/">Home</Link></h3>
            </div>
        </Layout>
    )
}

export default AccessDenied