import axios from 'axios';
import React, { useEffect, useState } from 'react'


export default function useCategory() {
    const [allCategory, setAllCategory] = useState([])


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
    useEffect(() => { showAllCategory() }, [])
    return allCategory;
};