import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

function CategoryContextProvider(props) {
    const [category, setCategory] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const hdlAddNewCategory = async (newCategory) => {
        try {
            await axios.post('http://localhost:8000/category/newCate', newCategory)
            .then(res => setTrigger(prv =>!prv))

        } catch (error) {
            alert(error.message)
        }

    }

    const hdlDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8000/category/del/${categoryId}`)
            .then(res => setTrigger(prv =>!prv))

        } catch (error) {
            alert(error.message)
        }
    }

    const hdlUpdateCategory = async (id, category) => {
        try {
            await axios.patch(`http://localhost:8000/category/updateCate/${id}`, {name: category})
            .then(res => setTrigger(prv =>!prv))
            
        } catch (error) {
            alert(error.message)
        }

    }

    useEffect(() => {
        const getCategory = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/category')
                setCategory(rs.data)

            } catch (error) {
                alert(error.message)
            }
        }

        getCategory()

    }, [trigger])


    return (
        <CategoryContext.Provider value={{ category, setCategory, hdlAddNewCategory, hdlUpdateCategory, hdlDeleteCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}

export { CategoryContextProvider }
export default CategoryContext
