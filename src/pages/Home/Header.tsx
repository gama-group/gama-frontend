import React from 'react'
import { Button, Icon } from 'react-bulma-components'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import useAuth from '../../hooks/useAuth'

import './styles.css'

const Header: React.FC = () => {
  const auth = useAuth()

  const logout = () => {
    console.log('do logout')
  }

  return (
    <div className="header px-6">
      <div className="header-links">
        <Link to="/" className="header-title">
          Gama
        </Link>
        {auth.isAuthenticated && (
          <NavLink
            to="/process"
            className="header-title ml-6 is-size-5  link-header"
            activeClassName="link-selected"
          >
            Processos Seletivos
          </NavLink>
        )}
      </div>

      {auth.isAuthenticated ? (
        <div>
          <div className="profile-logout">
            <Icon>
              <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
            </Icon>
            <Button type="button" className="exit-button ml-4" onClick={logout}>
              <Icon>
                <FontAwesomeIcon icon={faSignOutAlt} className="fa-1x" />
              </Icon>
            </Button>
          </div>
        </div>
      ) : (
        <Link to="/login">
          <Button type="button" className="header-button">
            Entrar
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Header
