import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const [products, setProducts] = useState([])

  const { slug } = useParams()

  const showCategoryProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/product/category/${slug}`);

      if (response.data.success) {
        setProducts(response.data.products);
        console.log(`products are ${response.data.products}`);
      } else {
        console.log("API response indicates failure.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    showCategoryProducts()
  }, [slug])


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
              {products?.map((p) => (
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


    </Layout>
  )
}

export default CategoryProducts