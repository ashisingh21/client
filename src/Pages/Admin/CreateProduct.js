import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateProduct = () => {
    const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '', shipping: '', photo: '' })
    const [allCategory, setAllCategory] = useState([])


    const createSlug = (slug) => {
        const trimmedSlug = slug.trim();
        const newSlug = trimmedSlug.replace(/\s+/g, '-');
        return newSlug;
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }


    const handleSubmit = async (e) => {
        console.log(product)

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
            productForm.append('photo', product.photo)
            console.log(productForm)

            const res = await axios.post('http://localhost:8080/api/v1/product/create-product',
                productForm
            )
            console.log(res)
            if (res?.data?.success) {
                toast.success(res.data.message);
                setProduct({ name: "", description: "", category: "", price: "", quantity: "", photo: "", shipping: "" });
            } else {
                toast.error(res.data.error);
            }
        } catch (error) {
            console.log(error)
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
        showAllCategory();

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
                                                <td><select className='w-50' name="category" value={product.category} onChange={handleChange} id="cars">
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
                                                <td><input type='file' name='photo' accept="image/*" onChange={(e) => setProduct({ ...product, photo: e.target.files[0] })} ></input></td>
                                            </tr>
                                            <tr><td className='w-50'>Shipping</td>
                                                <td><select className='w-50' value={product.shipping} name="shipping" onChange={handleChange} id="shipping">
                                                    <option value="">Select Shipping</option>
                                                    <option value="1" >True</option>
                                                    <option value="0" selected>False</option>
                                                </select></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                    <button type='submit' className='btn-primary'>Create Product</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </AdminDashboard >
        </>
    )
}

export default CreateProduct