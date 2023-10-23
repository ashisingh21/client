import React, { useState } from 'react'
import { useEffect } from 'react';
import Layout from '../Components/Layout/Layout'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';
import axios from 'axios';

function Homepage() {

    const [auth, setAuth] = useAuth();


    const [products, setProducts] = useState([])
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/product/get-product')
            if (res.data.success) {
                setProducts(res.data.products);
                console.log(products);
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

    useEffect(() => {
        console.log(products);
    }, [products]);



    return (
        <>
            <Layout>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <h4>Filters</h4>
                        </div>
                        <div className='col-md-9'>
                            <h4>All Products</h4>
                            <div className='row'>
                                {products.map((p) => (
                                    <>
                                        <div key={p._id} className='card' style={{ width: '30%', overflow: 'hidden', margin: '6px' }}>
                                            <img style={{ height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/get-product-photo/${p._id}`} alt='Card image cap' />
                                            <div className='card-body'>
                                                <h5 className='card-title'>{p.name}</h5>
                                                <p className='card-text'>{p.description}</p>
                                                <a href='#' className='btn btn-primary'>Read More</a>
                                            </div>
                                        </div>
                                    </>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Homepage