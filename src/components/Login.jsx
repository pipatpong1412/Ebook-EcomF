import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate()
    // const messageStatus = 
    const { setUser } = useContext(AuthContext)
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const hdlLogin = (e) => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async (e) => {
        e.preventDefault()
        try {
            const rs = await axios.post('http://localhost:8000/auth/login', input)
            localStorage.setItem('token', rs.data.token)

            const rs1 = await axios.get('http://localhost:8000/auth/me', {
                headers: { Authorization: `Bearer ${rs.data.token}` }
            })
            setUser(rs1.data)
            if (rs1.status === 200) {
                alert('Login Succesfully')
                navigate('/home')
            }
        } catch (error) {
            alert(error.response.data.message)
        }

    }

    return (
        <form onSubmit={hdlSubmit} className="flex justify-center min-h-screen items-center">
            <div className="bg-white rounded-3xl p-8 shadow-lg border-regal-blue border-2">
                <h1 className="text-4xlfont-bold text-center mb-6 text-dark-blue" >SIGN IN</h1>
                <div className="">
                    <input name="email" value={input.email} onChange={hdlLogin} placeholder='EMAIL' type="email" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src/assets/icons/email.png" alt="email" />
                    </div>
                </div>
                <div className="">
                    <input name="password" value={input.password} onChange={hdlLogin} placeholder='PASSWORD' type="password" className="block w-72 py-2.5 pl-3 pr-9 text-sm text-regal-blue rounded-xl border-2 border-regal-blue" />
                    <div className="relative -top-7 left-64">
                        <img src="src/assets/icons/padlock.png" alt="password" />
                    </div>
                </div>
                <div className="items-center justify-center flex bg-regal-blue rounded-lg text-white cursor-pointer h-9 mb-2 hover:bg-blue-950 hover:text-white">
                    <button type="submit">SIGN IN</button>
                </div>
                <div className="text-regal-blue">
                    <span>New Here? <Link to='/register' className="text-blue-500 underline">Create an Account</Link></span>
                </div>
            </div>
        </form>
    )
}
