/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef, useState } from 'react'
import { Button, Icon } from 'react-bulma-components'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faSignOutAlt,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'

import useAuth from '../../hooks/useAuth'

import './styles.css'

const useAutoClose = ({ ref, setOpen }) => {
  const handleClosure = React.useCallback(
    event => !ref.current?.contains(event.target) && setOpen(false),
    [setOpen, ref],
  )

  React.useEffect(() => {
    window.addEventListener('click', handleClosure)
    window.addEventListener('focusin', handleClosure)

    return () => {
      window.removeEventListener('click', handleClosure)
      window.removeEventListener('focusin', handleClosure)
    }
  }, [handleClosure, ref])
}

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth()

  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  useAutoClose({ ref, setOpen })

  return (
    <div className="header-container">
      <div className="header-links">
        <Link to="/" className="header-title">
          Gama
        </Link>
        {isAuthenticated && (
          <NavLink
            to="/processes"
            className="header-title ml-6 is-size-5  link-header is-hidden-mobile"
            activeClassName="link-selected"
          >
            Processos Seletivos
          </NavLink>
        )}
      </div>

      {isAuthenticated ? (
        <>
          <div className="is-hidden-mobile">
            <div className="profile-logout">
              <Icon>
                <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
              </Icon>
              <Button
                type="button"
                className="exit-button ml-4"
                onClick={logout}
              >
                <Icon>
                  <FontAwesomeIcon icon={faSignOutAlt} className="fa-1x" />
                </Icon>
              </Button>
            </div>
          </div>
          <div className="is-hidden-tablet">
            <div
              ref={ref}
              className={`dropdown is-right ${open ? 'is-active' : ''}`}
            >
              <div
                style={{ cursor: 'pointer' }}
                className="dropdown-trigger"
                onClick={e => {
                  e.stopPropagation()
                  setOpen(!open)
                }}
              >
                <FontAwesomeIcon icon={faEllipsisV} className="fa-2x" />
              </div>
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <Link
                    to="/processes"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Processos Seletivos
                  </Link>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/#"
                    className="dropdown-item"
                    onClick={() => {
                      setOpen(false)
                      logout()
                    }}
                  >
                    Sair
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
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
