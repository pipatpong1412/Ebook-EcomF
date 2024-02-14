import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const CartContext = createContext()

function CartContextProvider(props) {

    const [data, setData] = useState(null)
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
                setData(rs.data)

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }

        getCart()

    }, [])

    return (
        <CartContext.Provider value={{ data, loading }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext
export { CartContextProvider }