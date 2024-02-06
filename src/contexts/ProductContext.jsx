import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

function ProductContextProvider(props) {
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/product')
                setProduct(rs.data)

            } catch (error) {
                console.error(error)
            }
        }

        getProduct()

    }, [])

    useEffect(() => {
        const getCategory = async () => {
            try {
                const rs = await axios.get('http://localhost:8000/product/category')
                setCategory(rs.data)

            } catch (error) {
                console.error(error)
            }
        }

        getCategory()

    }, [])

    return (
        <ProductContext.Provider value={{ product, setProduct, category, setCategory }}>
            {props.children}
        </ProductContext.Provider>
    );
}

export { ProductContextProvider }
export default ProductContext
