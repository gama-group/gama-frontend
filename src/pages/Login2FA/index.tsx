import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Icon } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import useAuth from '../../hooks/useAuth'

import './styles.css'
import { AuthState } from '../../contexts/auth/types'

interface Login2FAFormData {
  token: string
}

const Login2FA: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      token: '',
    },
    validationSchema: Yup.object({
      token: Yup.string()
        .required('Insira um token.')
        .matches(/^[0-9]+$/, 'Contém apenas digitos')
        .min(6, 'Precisa ter exatamente 6 dígitos')
        .max(6, 'Precisa ter exatamente 6 dígitos'),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const { login2FA, userId, state: authState } = useAuth()

  async function handleSubmit({ token }: Login2FAFormData) {
    try {
      if (userId) {
        await login2FA(userId, token)
        history.push('/')
      }
    } catch {
      toast.error('Token inválido')
    } finally {
      formik.setSubmitting(false)
    }
  }

  React.useEffect(() => {
    if (authState === AuthState.AUTHENTICATED) {
      history.push('/')
    }
    if (authState === AuthState.UNAUTHENTICATED) {
      history.push('/login')
    }
  }, [authState, history])

  return (
    <div className="login-container">
      <div className="login-card">
        <Link to="/" className="login-logo">
          Gama
        </Link>
        <p className="login-title">Autenticação</p>
        <p className="login-subtitle">Informe o código de verificação</p>

        <form className="login-form" onSubmit={formik.handleSubmit}>
          {formik.errors.token ? (
            <div>
              <p className="login-error">{formik.errors.token}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control fullwidth>
              <Icon align="left" className="login-icon">
                <FontAwesomeIcon icon={faKey} />
              </Icon>
              <Form.Input
                placeholder="Token"
                id="token"
                name="token"
                className="login-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.token}
                maxLength={6}
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
            Autenticar
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

export default Login2FA
