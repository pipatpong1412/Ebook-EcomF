import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ManageCategoryPage from './ManageCategoryPage';
import ManageProductPage from './ManageProductPage';
import ManageUserPage from './ManageUserPage';

export default function DashboardPage() {

    const [content, setContent] = useState('');

    const hdlLink = (text) => {
        setContent(text)
    }

    return (
        <div>
            <Navbar />
            <div className='justify-between flex items-center relative'>
                <Sidebar changeContent={hdlLink} />
                <div className='absolute top-10 left-72 mx-10 w-2/3 mt-[3%]'>
                    {content === 'Product' ? <ManageProductPage /> : content === 'Category' ? <ManageCategoryPage /> : <ManageUserPage />}
                </div>
            </div>
        </div>

    )
}
