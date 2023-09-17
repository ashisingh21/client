import React from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/AdminMenu'

const AdminDashboard = ({ children }) => {
    return (
        <Layout>
            <div className='p-4 text-center'>
                <div className='row'>
                    <div className='col-md-4'>
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className='col-md-8'>
                        {children}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard