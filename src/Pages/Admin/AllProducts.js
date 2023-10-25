import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { toast } from 'react-toastify'

const AllProduct = () => {
    const [products, setProducts] = useState([])
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/product/get-product')
            if (res.data.success) {
                setProducts(res.data.products)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllProducts()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
            if (res?.data?.success) {
                toast.success(res.data.message);
                fetchAllProducts()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {

        }
    }



    const handleDeleteAll = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/product/delete-all-products`)
            if (res?.data?.success) {
                toast.success(res.data.message);
                fetchAllProducts()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {

        }
    }
    return (
        <>
            <AdminDashboard>
                <div className='d-flex align-items-center justify-content-between'><h1 className='mt-3'>All products </h1><button onClick={handleDeleteAll}>Delete All</button></div>
                <div className='row'>

                    {
                        products.map((p) => (
                            <>
                                <div className='col-md-4 mb-3'>
                                    <div className="card " >
                                        <div className="card-body">

                                            <table className='table table-bordered table-striped w-100'>
                                                <tbody>
                                                    <tr><td className='w-50'>Name</td>
                                                        <td>{p.name}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Photo</td>
                                                        <td><img style={{ width: '80px' }} src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} ></img></td>
                                                    </tr>
                                                    <tr><td className='w-50'>description</td>
                                                        <td>{p.description}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Price</td>
                                                        <td>{p.price}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Quantity</td>
                                                        <td>{p.quantity}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Category</td>
                                                        <td>{p.category.name}</td>
                                                    </tr>
                                                    <tr><td className='w-50'>Action</td>
                                                        <td className='actions-row'><a href={`update/${p.slug}`} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" /></svg></a><button onClick={() => handleDelete(p._id)} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div >
                            </>
                        ))
                    }
                </div>
            </AdminDashboard >
        </>
    )
}

export default AllProduct