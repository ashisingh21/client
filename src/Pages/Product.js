import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../Components/Layout/Layout';
import NotFound from './NotFound';

const Product = () => {
    const { slug } = useParams()
    const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '', shipping: '', photo: '' })
    const navigate = useNavigate();

    const [products, setProducts] = useState([])

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/get-product/${slug}`)
            if (res.data.success) {
                setProduct(res.data.product);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchSimilarProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-similar/${slug}`)
            if (res.data.success) {
                setProducts(res.data.products);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewProduct = (slug) => {
        try {
            navigate(`product/view/${slug}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProduct()
        fetchSimilarProduct()
    }, [])

    return (
        <>
            <Layout>
                {product?.name ? <>
                    <div className='container'>
                        <div div className='row'>
                            <div className='col-md-12'>
                                <h1 className='text-bold py-2'>{product.name}</h1>
                                <div className="card" >
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
                                        <button type='submit' className='btn-primary'>Add to Cart</button>

                                    </div>
                                </div>

                                <div className='row'>
                                    <h2 className='py-3'>Similar Product</h2>
                                    {products.map((p) => (
                                        <>
                                            <div key={p._id} className='card' style={{ width: '30%', overflow: 'hidden', margin: '6px' }}>
                                                <img style={{ height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt='Card image cap' />
                                                <div className='card-body'>
                                                    <h5 className='card-title'>{p.name}</h5>
                                                    <p className='card-text'>{p.description}</p>
                                                    <p className='card-text'>Category : {p.category.name} | Price : &#8377; {p.price} </p>
                                                    <button href='#' onClick={e => handleViewProduct(p.slug)} className='py-2 px-4 btn btn-secondary'>Read More</button> <button href='#' className='py-2 px-4 btn btn-primary'>Add to Cart</button>
                                                </div>
                                            </div>
                                        </>
                                    ))}

                                </div>
                            </div>

                        </div></div></> : <> <h2 className='pt-4 mt-4 text-center'>No Such Product Exist</h2></>}
            </Layout>



        </>
    )
}

export default Product