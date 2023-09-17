import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="list-group">
                <Link to="/dashboard/admin" className="list-group-item list-group-item-action">
                    Info
                </Link>
                <Link to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</Link>
                <Link to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</Link>
                <Link to="/dashboard/admin/products" className="list-group-item list-group-item-action">All Products</Link>
                <Link to="/dashboard/admin/users" className="list-group-item list-group-item-action">All Users</Link>
                {/* <Link to="/dashboard/admin/d" className="list-group-item list-group-item-action disabled">Vestibulum at eros</Link> */}
            </div>


        </>
    )
}

export default AdminMenu