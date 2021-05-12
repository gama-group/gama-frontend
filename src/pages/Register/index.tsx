import React, { useState } from 'react'
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

import './styles.css'

const validate = values => {
  interface tsTrash {
    [key: string]: string
  }
  const errors: tsTrash = {}

  if (values.name === '') {
    errors.name = 'Nome inválido'
  }

  if (values.socialRation === '') {
    errors.socialRation = 'Razão social inválida'
  }

  if (!/^[0-9]{14}$/i.test(values.cnpj)) {
    errors.cnpj = 'CNPJ inválido'
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
  const formik = useFormik({
    initialValues: {
      name: '',
      socialRation: '',
      cnpj: '',
      email: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 3))
    },
  })
  return (
    <div className="Login">
      <div className="topText">
        <p>Cadastro</p>
        <p>Crie sua conta para obter acesso à área privada.</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.name ? (
          <div>
            <p className="formError">{formik.errors.name}</p>
          </div>
        ) : null}
        <Form.Field>
          <Form.Control>
            <Icon align="left">
              <FontAwesomeIcon icon={faUser} />
            </Icon>
            <Form.Input
              id="name"
              placeholder="Nome Fantasia"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Form.Control>
        </Form.Field>
        {formik.errors.socialRation ? (
          <div>
            <p className="formError">{formik.errors.socialRation}</p>
          </div>
        ) : null}
        <Form.Field>
          <Form.Control>
            <Icon align="left">
              <FontAwesomeIcon icon={faBuilding} />
            </Icon>
            <Form.Input
              id="socialRation"
              placeholder="Razão Social"
              name="socialRation"
              onChange={formik.handleChange}
              value={formik.values.socialRation}
            />
          </Form.Control>
        </Form.Field>
        {formik.errors.cnpj ? (
          <div>
            <p className="formError">{formik.errors.cnpj}</p>
          </div>
        ) : null}
        <Form.Field>
          <Form.Control>
            <Icon align="left">
              <FontAwesomeIcon icon={faKey} />
            </Icon>
            <Form.Input
              id="cnpj"
              placeholder="CNPJ"
              name="cnpj"
              onChange={formik.handleChange}
              value={formik.values.cnpj}
            />
          </Form.Control>
        </Form.Field>
        {formik.errors.email ? (
          <div>
            <p className="formError">{formik.errors.email}</p>
          </div>
        ) : null}
        <Form.Field>
          <Form.Control>
            <Icon align="left">
              <FontAwesomeIcon icon={faEnvelope} />
            </Icon>
            <Form.Input
              id="email"
              placeholder="E-mail"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Form.Control>
        </Form.Field>
        {formik.errors.password ? (
          <div>
            <p className="formError">{formik.errors.password}</p>
          </div>
        ) : null}
        <Form.Field>
          <Form.Control>
            <Icon align="left">
              <FontAwesomeIcon icon={faLock} />
            </Icon>
            <Form.Input
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Form.Control>
        </Form.Field>
        <div className="forgotText">
          <p>Esqueci minha senha</p>
        </div>
        <Button.Group>
          <Button
            fullwidth
            rounded
            color="primary"
            className="signButton"
            onClick={validate}
            type="submit"
          >
            Entrar
          </Button>
        </Button.Group>
      </form>
      <div className="registerText">
        <p>Já possui uma conta? </p>
        <a href="./login">
          <p>Faça Login</p>
        </a>
      </div>
    </div>
  )
}

export default Register
