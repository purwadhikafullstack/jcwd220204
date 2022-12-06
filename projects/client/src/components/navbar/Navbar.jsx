import './navbar.css'
import { useState } from 'react'

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">Nginep.com</span>
        <div className="navItems">
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
