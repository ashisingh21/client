import axios from 'axios';
import React from 'react'

const Product = () => {
    const { slug } = useParams();


    const fetchProduct = async () => {
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

    return (
        <>


        </>
    )
}

export default Product