import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const AdminContext = createContext()
function AdminContextProvider(props) {
    const [mProduct, setMProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [user, setUser] = useState(null)
    const [skProduct, setSkProduct] = useState(0)

    useEffect(() => {
        const getProduct = async () => {
            try {
                // const skip = skProduct
                const rs = await axios.get(`http://localhost:8000/product/admin?skip=${skProduct}`)
                setMProduct(rs.data)

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
    }, [skProduct])

    return (
        <AdminContext.Provider value={{ mProduct, skProduct, setSkProduct }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContext
export { AdminContextProvider }
