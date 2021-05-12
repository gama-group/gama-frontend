import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const Header: React.FC = () => {
  return (
    <div className="header">
      <h2 className="header-title">Gama</h2>
      <Link to="/login">
        <button type="button" className="header-button">
          Entrar
        </button>
      </Link>
    </div>
  )
}

export default Header
