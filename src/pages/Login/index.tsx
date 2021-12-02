import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Icon } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { AuthState } from '../../contexts/auth/types'

import useAuth from '../../hooks/useAuth'

import './styles.css'

interface LoginFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const history = useHistory()
  const { login, state: authState } = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Endereço de e-mail inválido.')
        .required('Insira um e-mail.'),
      password: Yup.string().required('Insira uma senha.'),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  React.useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) history.push('/')
    if (authState === AuthState.UNAUTHENTICATED_2FA) history.push('/login2fa')
  }, [authState, history])

  async function handleSubmit({ email, password }: LoginFormData) {
    try {
      await login(email, password)
    } catch {
      toast.error('Usuário ou senha errados')
    } finally {
      formik.setSubmitting(false)
    }
  }

  const getLoginComponent = () => {
    return (
      <div className="login-container">
        <div className="login-card">
          <Link to="/" className="login-logo">
            Gama
          </Link>
          <p className="login-title">Login</p>
          <p className="login-subtitle">
            Faça login para obter acesso à área privada.
          </p>

          <form className="login-form" onSubmit={formik.handleSubmit}>
            {formik.errors.email ? (
              <div>
                <p className="login-error">{formik.errors.email}</p>
              </div>
            ) : null}
            <Form.Field>
              <Form.Control>
                <Icon align="left" className="login-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Icon>
                <Form.Input
                  placeholder="E-mail"
                  id="email"
                  name="email"
                  className="login-input"
                  size="medium"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Form.Control>
            </Form.Field>

            {formik.errors.password ? (
              <div>
                <p className="login-error">{formik.errors.password}</p>
              </div>
            ) : null}
            <Form.Field>
              <Form.Control fullwidth>
                <Icon align="left" className="login-icon">
                  <FontAwesomeIcon icon={faLock} />
                </Icon>
                <Form.Input
                  placeholder="Senha"
                  id="password"
                  name="password"
                  type="password"
                  className="login-input"
                  size="medium"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Form.Control>
              {/* <div className="login-forgot">
                <p>Esqueci minha senha</p>
              </div> */}
            </Form.Field>

            <Button
              type="submit"
              className="login-button"
              loading={formik.isSubmitting}
              fullwidth
            >
              Entrar
            </Button>
          </form>

          <div className="login-redirect">
            <p>Não possui uma conta? </p>
            <Link to="/register">
              <p>Cadastre-se</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return getLoginComponent()
}

export default Login
