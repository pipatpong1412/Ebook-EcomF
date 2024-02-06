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
        <div className='relative'>
            <Navbar />
            <Sidebar changeContent={hdlLink} />
            <div className='absolute top-1/2 right-1/3'>
                {content === 'Product' ? <ManageProduct /> : content === 'User' ? <ManageUser /> : <ManageCatetoey />}
            </div>
        </div>
    )
}
