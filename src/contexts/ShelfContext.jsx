import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const ShelfContext = createContext()
function ShelfContextProvider(props) {
    const [trigger, setTrigger] = useState(true)
    const [loading, setLoading] = useState(false)
    const [shelfProduct, setShelfProduct] = useState(null)

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem('token')
                if (!token) return
                const rs = await axios.get('http://localhost:8000/shelf/myshelf', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setShelfProduct(rs.data)

            } catch (error) {
                alert(error)
            } finally {
                setLoading(false)
            }
        }

        run()
    }, [trigger])

    const createShelf = async (productId) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            await axios.post('http://localhost:8000/shelf/create', { productId }, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => setTrigger(prv => !prv))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <ShelfContext.Provider value={{ shelfProduct, loading, createShelf }}>
            {props.children}
        </ShelfContext.Provider>
    )
}

export default ShelfContext
export { ShelfContextProvider }