import React from 'react'
import { useSearch } from '../Context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useSearch()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-search/${search.keyword}`)
            if (res.data.success) {
                setSearch({ ...search, result: res.data.result })
                navigate(`/product/search/${search.keyword}`)
                console.log(search.result);

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" value={search.keyword} onChange={(e) => setSearch({ ...search, keyword: e.target.value })} type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    )
}

export default SearchBar
