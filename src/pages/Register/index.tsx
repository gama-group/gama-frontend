/* eslint-disable camelcase */
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
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
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import useAuth from '../../hooks/useAuth'

import './styles.css'

interface RegisterFormData {
  trade_name: string
  company_name: string
  cnpj: string
  email: string
  password: string
}

const Register: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      trade_name: '',
      company_name: '',
      cnpj: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      trade_name: Yup.string().required('Insira um nome fantasia.'),
      company_name: Yup.string().required('Insira a razão social.'),
      cnpj: Yup.string()
        .required('Insira um CNPJ.')
        .matches(/^[0-9]{14}$/, 'CNPJ Inválido.'),
      email: Yup.string()
        .email('Endereço de e-mail inválido.')
        .required('Insira um e-mail.'),
      password: Yup.string()
        .required('Insira uma senha.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          'Deve possuir 8 caracteres, um maiúsculo, um minúsculo, um número e um caractere especial.',
        ),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const { register } = useAuth()

  async function handleSubmit({
    trade_name,
    company_name,
    cnpj,
    email,
    password,
  }: RegisterFormData) {
    try {
      await register(trade_name, company_name, cnpj, email, password)

      history.push('/')
    } catch {
      toast.error('Usuário já cadastrado')
    } finally {
      formik.setSubmitting(false)
    }
  }

  const limitCnpj = e => {
    const input = `${e.target.defaultValue}`
    if (input.length < 14) formik.handleChange(e)
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <Link to="/" className="register-logo">
          Gama
        </Link>
        <p className="register-title">Cadastro</p>
        <p className="register-subtitle">
          Crie sua conta para obter acesso à área privada.
        </p>

        <form className="register-form" onSubmit={formik.handleSubmit}>
          {formik.errors.trade_name ? (
            <div>
              <p className="register-error">{formik.errors.trade_name}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faUser} />
              </Icon>
              <Form.Input
                placeholder="Nome Fantasia"
                id="trade_name"
                name="trade_name"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.trade_name}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.company_name ? (
            <div>
              <p className="register-error">{formik.errors.company_name}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="register-icon">
                <FontAwesomeIcon icon={faBuilding} />
              </Icon>
              <Form.Input
                placeholder="Razão Social"
                id="company_name"
                name="company_name"
                className="register-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.company_name}
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
                max="14"
                className="register-input"
                size="medium"
                onChange={limitCnpj}
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
          <Link to="/login">
            <p>Faça login</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
