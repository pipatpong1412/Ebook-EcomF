import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductContext = createContext();

function ProductContextProvider(props) {
    const [product, setProduct] = useState(null)
    const [trigger, setTrigger] = useState(false)


    useEffect(() => {
        const getProduct = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/product')
                setProduct(rs.data)

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

        getProduct()

    }, [trigger])


    const createProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:8000/product/create', newProduct)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Create Product Successfully",
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

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/product/del/${productId}`)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Delete Product Successfully",
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

    const updateProduct = async (productId, product) => {
        try {
            await axios.patch(`http://localhost:8000/product/patch/${productId}`, product)
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Update Product Successfully",
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

    return (
        <ProductContext.Provider value={{ product, setProduct, createProduct, deleteProduct, updateProduct }}>
            {props.children}
        </ProductContext.Provider>
    );
}

export { ProductContextProvider }
export default ProductContext
