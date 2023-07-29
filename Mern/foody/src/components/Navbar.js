import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useState } from 'react'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

export default function Navbar() {
    let data = useCart()
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate()
    const handleLogOut = ()=>{

        localStorage.removeItem("authToken")
        navigate("/")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">Foody</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav me-auto mb-2">
                            <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            {(localStorage.getItem("authToken"))
                            ? <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                            : ""}

                        </div>
                        {(!localStorage.getItem("authToken"))
                        ? <div className='d-flex'>
                            <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>  
                            <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                          </div>
                        :
                        <div className='d-flex'>
                            <div className="btn bg-white text-success mx-1" onClick={()=> {setCartView(true)}}>My Cart{" "} <Badge pill bg="danger">{data.length}</Badge></div>
                            {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> :null}

                            <div className="btn bg-white text-danger mx-1" onClick={handleLogOut}>LogOut</div>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
