import React, { useState } from 'react'
import { Form, Button, Icon } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

const validate = values => {
  interface tsTrash {
    [key: string]: string
  }
  const errors: tsTrash = {}
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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="Login">
      <div className="topText">
        <p>Login</p>
        <p>Faça login para obter acesso à área privada.</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {formik.errors.email ? (
          <div>
            <p className="formError">{formik.errors.email}</p>
          </div>
        ) : null}
        <Form.Field className="emailField">
          <Form.Control>
            <Icon className="emailIcon">
              <FontAwesomeIcon icon={faEnvelope} />
            </Icon>
            <Form.Input
              id="email"
              placeholder="E-mail"
              name="email"
              className="emailInput"
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
        <Form.Field className="passField">
          <Form.Control>
            <Icon className="passIcon">
              <FontAwesomeIcon icon={faLock} />
            </Icon>
            <Form.Input
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
              className="passInput"
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
        <p>Não possui uma conta? </p>
        <a href="./register">
          <p>Cadastre-se</p>
        </a>
      </div>
    </div>
  )
}

export default Login
