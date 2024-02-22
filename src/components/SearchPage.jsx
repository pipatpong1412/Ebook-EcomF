import React, { useState } from 'react'
import Navbar from './Navbar'
import HomePage from './HomePage'

export default function SearchPage() {

    const [filterText, setFilterText] = useState('')

    return (
        <div>
            <Navbar setFilterText={setFilterText} filterText={filterText} />
            <HomePage filterText={filterText} />
        </div>
    )
}
