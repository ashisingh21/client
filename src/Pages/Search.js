import React, { useState } from 'react'
import { useEffect } from 'react';
import Layout from '../Components/Layout/Layout'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import { useSearch } from '../Context/Search';
import { useParams } from 'react-router-dom';

const Search = () => {
    const [products, setProducts] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useSearch()


    {/* below code is for filters */ }
    // const filterProducts = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/v1/product/filter-products', {
    //             checked, radio
    //         });

    //         if (response.data.success) {
    //             setProducts(response.data.product);
    //             console.log(`products are ${response.data.product}`);
    //         } else {
    //             console.log("API response indicates failure.");
    //         }
    //     } catch (error) {
    //         console.log("Error:", error);
    //     }
    // }


    // const handleFilter = (value, id) => {
    //     // console.log(`value is ${value}, id is ${id}`)
    //     let all = [...checked];

    //     if (value) {
    //         // console.log(`all is ${all}`)
    //         all.push(id);
    //     } else {
    //         all = all.filter((c) => c !== id)
    //     }

    //     // console.log(checked);
    //     setChecked(all);
    // }



    // let price = [

    //     {
    //         _id: 0,
    //         name: "Below 1000",
    //         value: [0, 1000]

    //     },
    //     {
    //         _id: 1,
    //         name: "1001 to 2500",
    //         value: [1001, 2500]

    //     },
    //     {
    //         _id: 2,
    //         name: "2501 to 5000",
    //         value: [2501, 5000]

    //     },
    //     {
    //         _id: 3,
    //         name: "Above 5000",
    //         value: [5000, 1000000000]

    //     }

    // ]
    let { keyword } = useParams();
    const handleAutoSearch = async (e) => {
        try {
            // let newKeyword = JSON.stringify(mykeyword)
            console.log(`new is ${keyword}`)
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-search/${keyword}`)
            if (res.data.success) {
                setSearch({ ...search, result: res.data.result })
                console.log(search.result);

            }

        } catch (error) {
            console.log(error);
        }
    }

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



    useEffect(() => {
        handleAutoSearch();
        showAllCategory();
        console.log(`after change ${search.result}`)
    }, [])


    return (
        <Layout>

            <div className='container-fluid'>
                <div className='row p-4'>
                    {/* below code is for filters */}
                    {/* <div className='col-md-3'>
                        <h4>Filter by Category</h4>
                        {allCategory.map((c) => (
                            <div key={c._id} className='d-flex'><input className='mx-2' type="checkbox" value={c.name} onChange={(e) => { handleFilter(e.target.checked, c._id) }}></input>{c.name}</div>
                        ))}

                        <h4 className='mt-4'>Filter by Price</h4>
                        {price.map((pr) => (
                            <div key={pr._id} className='d-flex'><input name="price" className='mx-2' type="radio" value={pr.value} onChange={(e) => { setRadio(pr.value) }}></input>{pr.name}</div>
                        ))}
                        <button className='my-4 px-3 py-2' onClick={() => window.location.reload()} >Reset Filters</button>
                    </div> */}

                    <div className='col-md-12 text-center'>
                        <h4>All Products</h4>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {search?.result.length < 1 ? (<h5 style={{ marginTop: '180px', color: 'grey' }}>No Items Found</h5>) : search?.result?.map((p) => (
                                <>
                                    <div key={p._id} className='card' style={{ width: '30%', overflow: 'hidden', margin: '6px' }}>
                                        <img style={{ height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt='Card image cap' />
                                        <div className='card-body'>
                                            <h5 className='card-title'>{p.name}</h5>
                                            <p className='card-text'>{p.description}</p>
                                            <p className='card-text'>Category : {p.category.name} | Price : &#8377; {p.price} </p>
                                            <button href='#' className='py-2 px-4 btn btn-secondary'>Read More</button> <button href='#' className='py-2 px-4 btn btn-primary'>Add to Cart</button>
                                        </div>
                                    </div>
                                </>
                            ))}

                        </div>
                        {/* {products && products.length < count &&
                            (<div className='col-md-12'><button onClick={
                                (e) => { e.preventDefault(); setPage(page + 1); }
                            }>{loading ? 'Loading...' : 'Load More'}</button></div>)} */}
                    </div>

                </div>
            </div>
        </Layout >
    )
}

export default Search