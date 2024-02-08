import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

function CategoryContextProvider(props) {
    const [getCategory, setGetCategory] = useState(null)

    const hdlAddNewCategory = async (newCategory) => {
        try {
            const rs = await axios.post('http://localhost:8000/category/newCate', newCategory)
            if (rs.status === 200) {
                alert('Add Success')
            }
        } catch (error) {
            alert(error.message)
        }

    }

    const hdlUpdateCategory = async (category) => {
        try {
            const rs = await axios.patch(`http://localhost:8000/category/updateCate/:${category.id}`, category.name)
            if (rs.status === 200) {
                alert('Update Success')
            }
        } catch (error) {
            alert(error.message)
        }

    }

    useEffect(() => {
        const getCategory = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/category')
                setGetCategory(rs.data)

            } catch (error) {
                console.error(error)
            }
        }

        getCategory()

    }, [])


    return (
        <CategoryContext.Provider value={{ getCategory, setGetCategory, hdlAddNewCategory, hdlUpdateCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}

export { CategoryContextProvider }
export default CategoryContext
