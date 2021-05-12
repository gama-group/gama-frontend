import React from 'react'
import { Button } from 'react-bulma-components'
import { Link } from 'react-router-dom'

import './styles.css'

const Header: React.FC = () => {
  return (
    <div className="header">
      <h2 className="header-title">Gama</h2>
      <Link to="/login">
        <Button type="button" className="header-button">
          Entrar
        </Button>
      </Link>
    </div>
  )
}

export default Header
