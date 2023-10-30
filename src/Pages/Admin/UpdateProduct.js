import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {
    const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '', shipping: '', photo: '' })
    const [allCategory, setAllCategory] = useState([])

    const [tPhoto, setTphoto] = useState();


    const navigate = useNavigate();
    const createSlug = (slug) => {
        const trimmedSlug = slug.trim();
        const newSlug = trimmedSlug.replace(/\s+/g, '-');
        return newSlug;
    }


    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }




    const handleSubmit = async (e) => {
        // console.log(product)

        try {
            e.preventDefault()
            const productForm = new FormData();
            const slug = createSlug(product.name);
            productForm.append('name', product.name)
            productForm.append('description', product.description)
            productForm.append('slug', slug)
            productForm.append('category', product.category)
            productForm.append('quantity', product.quantity)
            productForm.append('price', product.price)
            productForm.append('shipping', product.shipping)
            tPhoto && productForm.append('photo', tPhoto)
            console.log(productForm)

            const res = await axios.put(`/api/v1/product/update-product/${product._id}`,
                productForm
            )
            console.log(res);

            if (res?.data?.success) {
                toast.success(res.data.message);
                setProduct({ name: "", description: "", category: "", price: "", quantity: "", photo: "", shipping: "" });
                navigate('/dashboard/admin/products')
            } else {
                toast.error(res.data.error);
            }
        } catch (error) {
            console.log(error)
        }

    }
    const { slug } = useParams();

    const getProduct = async () => {
        try {

            const response = await axios.get(`/api/v1/product/get-product/${slug}`);

            if (response.data.success) {
                setProduct(response.data.product);
                console.log(response.data.product)

            } else {
                console.log("API response indicates failure.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const showAllCategory = async () => {
        try {
            const response = await axios.get('/api/v1/category/all-category');

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
        showAllCategory();
        getProduct();

    }, [])
    return (
        <>
            <AdminDashboard>
                <h1>Create Product</h1>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="card " >
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <table className='table table-bordered table-striped w-100'>
                                        <tbody>

                                            <tr><td className='w-50'>Name</td>
                                                <td><input type='text' name='name' value={product.name} onChange={handleChange}></input></td>
                                            </tr>
                                            <tr><td className='w-50'>description</td>
                                                <td><input type='text' name='description' value={product.description} onChange={handleChange}></input></td>
                                            </tr>
                                            <tr><td className='w-50'>Price</td>
                                                <td><input type='number' name='price' value={product.price} onChange={handleChange}></input></td>
                                            </tr>
                                            <tr><td className='w-50'>Category</td>
                                                <td><select className='w-50' name="category" value={product.category} onChange={handleChange} id="category">
                                                    <option value="">Select Category</option>
                                                    {allCategory.map((c) => (
                                                        <>
                                                            <option key={c._id} value={c._id}>{c.name}</option>
                                                        </>
                                                    ))
                                                    }
                                                </select></td>
                                            </tr>
                                            <tr><td className='w-50'>Quantity</td>
                                                <td><input type='number' value={product.quantity} name='quantity' onChange={handleChange}></input></td>
                                            </tr>
                                            <tr><td className='w-50'>Photo</td>

                                                <td><div style={{ border: '1px solid grey', borderRadius: '8px', lineHeight: '2', cursor: 'pointer' }}><label htmlFor="fileInput" className="custom-file-label">
                                                    {product.photo ? product.name : 'Upload Photo'}
                                                </label>
                                                    <input
                                                        type="file"
                                                        id="fileInput"
                                                        name="photo"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            setProduct({ ...product, photo: e.target.files[0] });
                                                            setTphoto(e.target.files[0]);
                                                        }}
                                                        className="custom-file-input"
                                                        style={{ display: 'none' }}

                                                    /></div>

                                                    {tPhoto ? (<div>
                                                        <img style={{ height: '100px', objectFit: 'contain' }} className='card-img-top' src={URL.createObjectURL(tPhoto)} alt='Card image cap' />
                                                    </div>) : (<div>
                                                        <img style={{ height: '100px', objectFit: 'contain' }} className='card-img-top' src={`/api/v1/product/product-photo/${product._id}`} alt='Card image cap' />
                                                    </div>)

                                                    }


                                                </td>
                                            </tr>
                                            <tr><td className='w-50'>Shipping</td>
                                                <td><select className='w-50' value={product.shipping} name="shipping" onChange={handleChange} id="shipping">

                                                    <option value="1"  >true</option>
                                                    <option value="0" >false</option>
                                                </select></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <button type='submit' className='btn-primary'>Update Product</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </AdminDashboard >
        </>
    )
}

export default UpdateProduct