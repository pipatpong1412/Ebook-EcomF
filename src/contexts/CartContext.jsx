import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const CartContext = createContext()

function CartContextProvider(props) {

    const [cart, setCart] = useState(null)
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
                setCart(rs.data)

            } catch (error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                })

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
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Add to Cart Successfully",
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

    const delProductInCart = async (cartId) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            await axios.delete(`http://localhost:8000/cart/del/${cartId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setTrigger(prv => !prv))
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Remove from Cart Successfully",
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

    const updateCartStatus = async (cartId) => {
        try {
            let token = localStorage.getItem('token')
            if (!token) { return }
            await axios.patch(`http://localhost:8000/cart/patch/${cartId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setTrigger(prv => !prv))
            // alert('Remove from Cart Successfully')

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
        <CartContext.Provider value={{ cart, loading, addProducttoCart, delProductInCart, updateCartStatus }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext
export { CartContextProvider }