import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


const SearchContext = createContext()
function SearchContextProvider(props) {

    const [productSearch, setProductSearch] = useState(null)
    const [search, setSearch] = useState('')

    const run = async () => {
        const rs = await axios.get(`http://localhost:8000/product/search?product=${search}`)
        setProductSearch(rs.data)
    }


    return (
        <SearchContext.Provider value={{ productSearch, setSearch, search, run }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContext
export { SearchContextProvider }