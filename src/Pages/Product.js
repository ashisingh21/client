import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';
import NotFound from './NotFound';

const Product = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '', shipping: '', photo: '' })

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/get-product/${slug}`)
            if (res.data.success) {
                setProduct(res.data.product);
                console.log(res);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <>
            <Layout>
                {product?.name ? <><h1>{product.name}</h1>
                    <div div className='row'>
                        <div className='col-md-12'>
                            <div className="card " >
                                <div className="card-body">

                                    <table className='table table-bordered table-striped w-100'>
                                        <tbody>

                                            <tr><td className='w-50'>Name</td>
                                                <td>{product.name}</td>
                                            </tr>
                                            <tr><td className='w-50'>description</td>
                                                <td>{product.description}</td>
                                            </tr>
                                            <tr><td className='w-50'>Price</td>
                                                <td>{product.price}</td>
                                            </tr>
                                            <tr><td className='w-50'>Category</td>
                                                <td>{product.category.name}</td>
                                            </tr>
                                            <tr><td className='w-50'>Quantity</td>
                                                <td>{product.quantity}</td>
                                            </tr>
                                            <tr><td className='w-50'>Photo</td>
                                                <img style={{ height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt='Card image cap' />

                                            </tr>
                                            <tr><td className='w-50'>Shipping</td>
                                                <td>{product.shipping ? 'Yes' : 'No'}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <button type='submit' className='btn-primary'>Update Product</button>

                                </div>
                            </div>
                        </div>

                    </div></> : <> <h2 className='pt-4 mt-4 text-center'>No Such Product Exist</h2></>}




            </Layout>



        </>
    )
}

export default Product