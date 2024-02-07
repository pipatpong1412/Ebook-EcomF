import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ManageCatetoey from './ManageCategory';
import ManageProduct from './ManageProduct';
import ManageUser from './ManageUser';

export default function Dashboard() {

    const [content, setContent] = useState('');

    const hdlLink = (text) => {
        setContent(text)
    }

    return (
        <div>
            <Navbar />
            <div className='justify-between flex items-center relative'>
                <Sidebar changeContent={hdlLink} />
                <div className='absolute top-10 left-72 mx-10 w-2/3'>
                    {content === 'Product' ? <ManageProduct /> : content === 'Category' ? <ManageCatetoey /> : <ManageUser />}
                </div>
            </div>
        </div>

    )
}
