import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const CartContext = createContext()

function CartContextProvider(props) {

    const [data, setData] = useState(null)
    const [cartId, setCartId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCart = async () => {
            try {
                setLoading(true)
                let token = localStorage.getItem('token')
                if (!token) { return }
                const rs = await axios.get('http://localhost:8000/cart/mycart', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                // console.log(rs.data[0].cartId)
                setData(rs.data)
                setCartId(rs.data.length === 0 ? null : rs.data[0].cartId)

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCart()

    }, [])

    const addProducttoCart = async (cartId, productId) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            const rs = await axios.post(`http://localhost:8000/cart/add/${productId}`, cartId, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (rs.status === 200) {
                alert('Add to Cart Successfully')
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const delProductInCart = async (productId) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            const rs = await axios.delete(`http://localhost:8000/cart/del/${productId}`,  {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (rs.status === 200) {
                alert('Delete from Cart Successfully')
            }

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <CartContext.Provider value={{ cartId, data, loading, addProducttoCart, delProductInCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext
export { CartContextProvider }