import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

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
                alert(error.message)
            }
        }

        getProduct()

    }, [trigger])


    const createProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:8000/product/newProduct', newProduct)
            .then(res => setTrigger(prv =>!prv))

        } catch (error) {
            alert(error.message)
        }
    }


    return (
        <ProductContext.Provider value={{ product, setProduct, createProduct }}>
            {props.children}
        </ProductContext.Provider>
    );
}

export { ProductContextProvider }
export default ProductContext
