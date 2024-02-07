import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

function CategoryContextProvider(props) {
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const getCategory = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/category')
                setCategory(rs.data)

            } catch (error) {
                console.error(error)
            }
        }

        getCategory()

    }, [])

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}

export { CategoryContextProvider }
export default CategoryContext
