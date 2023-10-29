import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className="list-group">
                <Link to="/dashboard/user" className="list-group-item list-group-item-action">
                    Profile
                </Link>
                <Link to="/dashboard/user/update-profile" className="list-group-item list-group-item-action">Update Profile</Link>
                <Link to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</Link>

                {/* <Link to="/dashboard/admin/d" className="list-group-item list-group-item-action disabled">Vestibulum at eros</Link> */}
            </div>


        </>
    )
}

export default UserMenu