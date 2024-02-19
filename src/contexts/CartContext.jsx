import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const CartContext = createContext()

function CartContextProvider(props) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        const getCart = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')
                if (!token) { return }
                const rs = await axios.get('http://localhost:8000/cart/mycart', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setData(rs.data)

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCart()

    }, [trigger])

    const addProducttoCart = async (product) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            await axios.post(`http://localhost:8000/cart/add/${product.id}`, { product }, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => setTrigger(prv => !prv))
            alert('Add to Cart Successfully')
        } catch (error) {
            alert(error.message)
        }
    }

    const delProductInCart = async (cartId) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            await axios.delete(`http://localhost:8000/cart/del/${cartId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setTrigger(prv => !prv))
            alert('Remove from Cart Successfully')

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <CartContext.Provider value={{ data, loading, addProducttoCart, delProductInCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext
export { CartContextProvider }