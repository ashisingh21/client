import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import Layout from '../Components/Layout/Layout'

const Categories = () => {

    const allCategory = useCategory()

    return (
        <Layout>
            {allCategory.map((c) => (

                <>

                    <div><Link to={`/category/${c.name}`}>{c.name}</Link></div>
                </>
            ))}

        </Layout>
    )
}

export default Categories