import React from 'react'

import './styles.css'

const Header: React.FC = () => {
  return (
    <div className="header">
      <h2 className="header-title">Gama</h2>
      <button type="button" className="header-button">
        Entrar
      </button>
    </div>
  )
}

export default Header
