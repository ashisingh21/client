import React from 'react'
import { useEffect } from 'react';
import Layout from '../Components/Layout/Layout'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';

function Homepage() {

    const [auth, setAuth] = useAuth();



    return (
        <>
            <Layout>
                <pre>{JSON.stringify(auth, null, 4)}</pre>
                Homepage
            </Layout>
        </>
    )
}

export default Homepage