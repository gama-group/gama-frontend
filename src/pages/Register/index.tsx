import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Icon } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faLock,
  faUser,
  faBuilding,
  faKey,
} from '@fortawesome/free-solid-svg-icons'

import useAuth from '../../hooks/useAuth'

import './styles.css'

interface RegisterFormData {
  tradeName: string
  companyName: string
  cnpj: string
  email: string
  password: string
}

const validate = values => {
  interface tsTrash {
    [key: string]: string
  }
  const errors: tsTrash = {}

  if (values.tradeName === '') {
    errors.tradeName = 'Nome inválido'
  }

  if (values.companyName === '') {
    errors.companyName = 'Razão social inválida'
  }

  if (!/^[0-9]{14}$/i.test(values.cnpj)) {
    errors.cnpj = 'CNPJ inválido, são necessários 14 digitos'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'E-mail inválido'
  }

  if (
    values.password === '' ||
    (values.password &&
      values.password !== undefined &&
      values.password.length < 8)
  ) {
    errors.password = 'Senha deve ter no mínimo 8'
  }

  return errors
}

const Register: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      tradeName: '',
      companyName: '',
      cnpj: '',
      email: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const { register } = useAuth()

  async function handleSubmit({
    tradeName,
    companyName,
    cnpj,
    email,
    password,
  }: RegisterFormData) {
    try {
      await register(tradeName, companyName, cnpj, email, password)

      history.push('/')
    } finally {
      formik.setSubmitting(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <p className="register-title">Cadastro</p>
        <p className="register-subtitle">
          Crie sua conta para obter acesso à área privada.
        </p>

        <form className="register-form" onSubmit={formik.handleSubmit}>
          {formik.errors.tradeName ? (
            <div>
              <p className="register-error">{formik.errors.tradeName}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faUser} />
              </Icon>
              <Form.Input
                placeholder="Nome Fantasia"
                id="tradeName"
                name="tradeName"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.tradeName}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.companyName ? (
            <div>
              <p className="register-error">{formik.errors.companyName}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faBuilding} />
              </Icon>
              <Form.Input
                placeholder="Razão Social"
                id="companyName"
                name="companyName"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.companyName}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.cnpj ? (
            <div>
              <p className="register-error">{formik.errors.cnpj}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faKey} />
              </Icon>
              <Form.Input
                placeholder="CNPJ"
                id="cnpj"
                name="cnpj"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.cnpj}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.email ? (
            <div>
              <p className="register-error">{formik.errors.email}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              <Form.Input
                placeholder="E-mail"
                id="email"
                name="email"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.password ? (
            <div>
              <p className="register-error">{formik.errors.password}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faLock} />
              </Icon>
              <Form.Input
                placeholder="Senha"
                id="password"
                name="password"
                type="password"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Control>
          </Form.Field>

          <Button
            type="submit"
            className="register-button"
            loading={formik.isSubmitting}
            fullwidth
          >
            Cadastrar
          </Button>
        </form>

        <div className="register-redirect">
          <p>Já possui uma conta? </p>
          <a href="./login">
            <p>Faça login</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Register
