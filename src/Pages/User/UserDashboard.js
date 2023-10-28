import React from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/UserMenu'

const UserDashboard = ({ children }) => {
    return (
        <Layout>
            <div className='p-4 '>
                <div className='row'>
                    <div className='col-md-4 text-center'>
                        <UserMenu></UserMenu>
                    </div>
                    <div className='col-md-8'>
                        {children}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard