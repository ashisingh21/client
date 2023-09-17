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
                                                        <td className='actions-row'><button onClick={() => handleDelete(p._id)} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </AdminDashboard>
        </>
    )
}

export default AllProduct