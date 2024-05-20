import React from 'react'
import './Navbar.css'
import Logo from '../../assets/images/zenklub_full_logo_white.svg'

const Navbar = () => {
  return (
    <header>
       <img src={Logo} alt="Logotipo Zenklub"/>
    </header>
  );
}

export default Navbar