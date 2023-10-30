import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import axios from 'axios'
import { toast } from 'react-toastify'

const CreateCategory = () => {
    const [heading, setHeading] = useState('create category')
    const [selectedId, setSelectedId] = useState('')
    const [allCategory, setAllCategory] = useState([])
    const [category, setCategory] = useState({ name: '', slug: '' })
    const [deleteCat, setDeleteCat] = useState('')

    const createSlug = (slug) => {
        const trimmedSlug = slug.trim();
        const newSlug = trimmedSlug.replace(/\s+/g, '-');
        return newSlug;
    }
    const handleChange = (e) => {
        const newName = e.target.value;
        const newSlug = createSlug(newName);
        setCategory({ name: newName, slug: newSlug });
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post('/api/v1/category/create-category', {
                name: category.name, slug: category.slug
            })
            if (res?.data?.success) {
                toast.success(res.data.message);
                setCategory({ name: '', slug: '' });
                showAllCategory()
            } else {

                toast.error(res.data.error);

            }
        } catch (error) {

        }

    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/v1/category/delete-category/${id}`)
            if (res?.data?.success) {
                toast.success(res.data.message);
                showAllCategory()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {

        }

    }

    const handleDeleteAll = async () => {
        try {
            const res = await axios.delete(`/api/v1/category/delete-all-category`)
            if (res?.data?.success) {
                toast.success(res.data.message);
                showAllCategory()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {
            console.log(error)
        }

    }



    const clickUpdate = async (id, name) => {
        setHeading('update category');
        const slug = createSlug(name);
        setCategory({ name: name, slug: slug });
        setSelectedId(id);
    }

    const handleUpdate = async (id) => {
        setHeading('create category');
        try {
            const id = selectedId;
            const res = await axios.put(`/api/v1/category/update-category/${id}`, {
                name: category.name
            })
            if (res?.data?.success) {
                toast.success(res.data.message);
                setCategory({ name: '', slug: '' });
                showAllCategory()
            } else {
                toast.error(res.data.error);

            }
        } catch (error) {

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

    }, [])
    return (
        <>
            <AdminDashboard>
                <h1>{heading}</h1>
                <table className="table table-bordered table-striped">

                    <tbody>
                        <tr >
                            <td className='w-50'>Category Name</td>
                            <td><input name='name' onChange={handleChange} value={category.name}></input></td>

                        </tr>
                        <tr>
                            <td>Category Slug</td>
                            <td>{category.slug}</td>

                        </tr>

                    </tbody>
                </table>
                <button type='submit' onClick={heading == 'create category' ? handleSubmit : handleUpdate} className='btn-primary'>{heading}</button>

                <div className='d-flex align-items-center justify-content-between'><h3 className='mt-3'>All Category </h3><button onClick={handleDeleteAll}>Delete All</button></div>
                <table className="table table-bordered table-striped">

                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Actions</th>
                        </tr>

                        {allCategory?.map((c) => (

                            <>
                                <tr key={c._id}>
                                    <td className='w-50'>{c.name} </td>
                                    <td className='w-25'>{c.slug} </td>
                                    <td className='actions-row'><button onClick={() => clickUpdate(c._id, c.name)} className='update action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" /></svg></button><button onClick={() => handleDelete(c._id)} className='delete action'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></button></td>

                                </tr>
                            </>
                        ))}



                    </tbody>
                </table>
            </AdminDashboard>
        </>
    )
}

export default CreateCategory


