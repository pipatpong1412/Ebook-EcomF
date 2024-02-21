import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const CategoryContext = createContext();

function CategoryContextProvider(props) {
    const [category, setCategory] = useState(null)
    const [trigger, setTrigger] = useState(false)

    const hdlAddNewCategory = async (newCategory) => {
        try {
            await axios.post('http://localhost:8000/category/create', newCategory)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Create Category Successfully",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    const hdlDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8000/category/del/${categoryId}`)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Delete Category Successfully",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const hdlUpdateCategory = async (id, category) => {
        try {
            await axios.patch(`http://localhost:8000/category/patch/${id}`, category)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Category Successfully",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${error.response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    useEffect(() => {
        const getCategory = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/category')
                setCategory(rs.data)

            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })
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
