import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }
    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            if (input.password !== input.confirmPassword) {
                return alert('Please check confirm password')
            }
            const rs = await axios.post('http://localhost:8000/auth/register', input)
            if (rs.status === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Register Successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/login')
            }

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
        <form onSubmit={hdlSubmit} className="flex justify-center min-h-screen items-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2">
                <h1 className="text-4xlfont-bold text-center mb-6 text-dark-blue" >SIGN UP</h1>
                <div className="">
                    <input name='name' value={input.name} onChange={hdlChange} placeholder='NAME' type="text" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src\assets\icons\user.png" alt="name" />
                    </div>
                </div>
                <div className="">
                    <input name='email' value={input.email} onChange={hdlChange} placeholder='EMAIL' type="email" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src\assets\icons\email.png" alt="email" />
                    </div>
                </div>
                <div className="">
                    <input name='password' value={input.password} onChange={hdlChange} placeholder='PASSWORD' type="password" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src\assets\icons\padlock.png" alt="password" />
                    </div>
                </div>
                <div className="">
                    <input name='confirmPassword' value={input.confirmPassword} onChange={hdlChange} placeholder='CONFIRM PASSWORD' type="password" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src\assets\icons\padlock.png" alt="password" />
                    </div>
                </div>
                <div className="items-center justify-center flex bg-regal-blue rounded-lg text-white cursor-pointer h-9 mb-2 hover:bg-blue-950 hover:text-white">
                    <button type="submit">SIGN UP</button>
                </div>
                <div className="text-regal-blue">
                    <span>Already had account? <Link to='/login' className="text-blue-500 underline">Sign In</Link></span>
                </div>
            </div>
        </form>
    )
}
