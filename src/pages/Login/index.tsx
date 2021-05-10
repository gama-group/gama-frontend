import React, { useState } from 'react'
import { Form, Button, Icon } from 'react-bulma-components'

import './styles.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function validateForm() {
    return email.length > 0 && password.length > 0
  }

  function handleSubmit(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault()
  }
  return (
    <div className="Login">
      <Form.Field onSubmit={handleSubmit}>
        <Form.Control>
          <Form.Input
            placeholder="E-mail"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Form.Field>
        <Form.Control>
          <Form.Input
            placeholder="Senha"
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Icon align="left">
            <i className="github" />
          </Icon>
        </Form.Control>
      </Form.Field>
      <Button.Group>
        <Button
          fullwidth
          rounded
          color="primary"
          disabled={!validateForm()}
          onClick={() => console.log(this)}
        >
          Entrar
        </Button>
      </Button.Group>
    </div>
  )
}

export default Login
