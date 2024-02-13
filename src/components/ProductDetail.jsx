import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function GetProduct() {
    const location = useLocation()
    const [getProductId, setGetProductId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getProductById = async () => {
            try {
                const productId = location.pathname.split('/')[2]
                const rs = await axios.get(`http://localhost:8000/product/${productId}`)
                setGetProductId(rs.data)
                setLoading(!loading)

            } catch (error) {
                alert(error.message)
            } finally {
                setLoading(false)
            }
        }
        getProductById()

    }, [])

    if (loading) {
        return (
            <div>
                <Navbar />
                <h3>loading....</h3>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            {getProductId.name}
        </div>
    )
}
