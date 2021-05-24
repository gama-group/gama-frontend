import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Icon } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import useAuth from '../../hooks/useAuth'

import './styles.css'

interface LoginFormData {
  email: string
  password: string
}

const validate = values => {
  const errors: Record<string, string> = {}

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (
    values.password &&
    values.password !== undefined &&
    values.password.length < 8
  ) {
    errors.password = 'Password must be at least 8 characters long'
  }

  return errors
}

const Login: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const { login } = useAuth()

  async function handleSubmit({ email, password }: LoginFormData) {
    try {
      await login(email, password)

      history.push('/')
    } catch {
      toast.error('Usuário ou senha errados')
    } finally {
      formik.setSubmitting(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
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
            <div className="login-forgot">
              <p>Esqueci minha senha</p>
            </div>
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
          <a href="./register">
            <p>Cadastre-se</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login
