import React, { useState } from 'react'
import { useEffect } from 'react';
import Layout from '../Components/Layout/Layout'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../Context/Cart';

function Homepage() {

    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [cart, setCart] = useCart([])

    let price = [

        {
            _id: 0,
            name: "Below 1000",
            value: [0, 1000]

        },
        {
            _id: 1,
            name: "1001 to 2500",
            value: [1001, 2500]

        },
        {
            _id: 2,
            name: "2501 to 5000",
            value: [2501, 5000]

        },
        {
            _id: 3,
            name: "Above 5000",
            value: [5000, 1000000000]

        }

    ]


    const fetchProductCount = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-count`)
            if (res.data.success) {
                setCount(res.data.count);
                console.log(res.data.count);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }


    const fetchAllProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
            if (res.data.success) {
                setLoading(true)
                setProducts(res.data.products);
                setLoading(false)
                console.log(`all ppp ${res.data.products}`);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const loadMore = async (e) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
            if (res.data.success) {
                setLoading(true)
                setProducts([...products, ...res.data.products]);
                setLoading(false)
                console.log(res.data.products);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (page === 1) return;
        loadMore()
    }, [page])


    const showAllCategory = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/category/all-category');

            if (response.data.success) {
                setAllCategory(response.data.categories);
            } else {
                console.log("API response indicates failure.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const filterProducts = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/product/filter-products', {
                checked, radio
            });

            if (response.data.success) {
                setProducts(response.data.product);
                console.log(`products are ${response.data.product}`);
            } else {
                console.log("API response indicates failure.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }


    const handleFilter = (value, id) => {
        // console.log(`value is ${value}, id is ${id}`)
        let all = [...checked];

        if (value) {
            // console.log(`all is ${all}`)
            all.push(id);
        } else {
            all = all.filter((c) => c !== id)
        }

        // console.log(checked);
        setChecked(all);
    }


    const handleViewProduct = (slug) => {
        try {
            navigate(`product/view/${slug}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProductCount()
    }, [count])

    // useEffect(() => {
    //     fetchProductCount()
    // }, [count])

    useEffect(() => {
        showAllCategory();
    }, [])

    useEffect(() => {
        if (!checked.length > 1 || !radio.length) fetchAllProducts();
    }, [checked.length, radio.length])


    useEffect(() => {
        if (checked.length > 1 || radio.length) filterProducts();
    }, [checked, radio]);



    return (
        <>
            <Layout>
                <div className='container-fluid'>
                    <div className='row p-4'>
                        <div className='col-md-3'>
                            <h4>Filter by Category</h4>
                            {allCategory.map((c) => (
                                <div key={c._id} className='d-flex'><input className='mx-2' type="checkbox" value={c.name} onChange={(e) => { handleFilter(e.target.checked, c._id) }}></input>{c.name}</div>
                            ))}

                            <h4 className='mt-4'>Filter by Price</h4>
                            {price.map((pr) => (
                                <div key={pr._id} className='d-flex'><input name="price" className='mx-2' type="radio" value={pr.value} onChange={(e) => { setRadio(pr.value) }}></input>{pr.name}</div>
                            ))}
                            <button className='my-4 px-3 py-2' onClick={() => window.location.reload()} >Reset Filters</button>
                        </div>
                        <div className='col-md-9'>
                            <h4>All Products</h4>
                            <div className='row'>
                                {products.map((p) => (
                                    <>
                                        <div key={p._id} className='card' style={{ width: '30%', overflow: 'hidden', margin: '6px' }}>
                                            <img style={{ height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt='Card image cap' />
                                            <div className='card-body'>
                                                <h5 className='card-title'>{p.name}</h5>
                                                <p className='card-text'>{p.description}</p>
                                                <p className='card-text'>Category : {p.category.name} | Price : &#8377; {p.price} </p>
                                                <button href='#' onClick={e => handleViewProduct(p.slug)} className='py-2 px-4 btn btn-secondary'>Read More</button> <button onClick={() => {
                                                    toast.success('Item added to cart');
                                                    setCart([...cart, p])

                                                    localStorage.setItem('cartInLocal', JSON.stringify([...cart, p]));

                                                }} href='#' className='py-2 px-4 btn btn-primary'>Add to Cart</button>
                                            </div>
                                        </div >
                                    </>
                                ))}

                            </div>
                            {products && products.length < count &&
                                (<div className='col-md-12'><button onClick={
                                    (e) => { e.preventDefault(); setPage(page + 1); }
                                }>{loading ? 'Loading...' : 'Load More'}</button></div>)}
                        </div>

                    </div>
                </div>
            </Layout >
        </>
    )
}

export default Homepage