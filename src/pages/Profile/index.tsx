import React from 'react'
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

interface FirstFormData {
  tradeName: string
  companyName: string
  cnpj: string
}

interface SecondFormData {
  email: string
}

const validate = values => {
  interface tsTrash {
    [key: string]: string
  }
  const errors: tsTrash = {}

  if (values.trade_name === '') {
    errors.trade_name = 'Nome inválido'
  }

  if (values.company_name === '') {
    errors.company_name = 'Razão social inválida'
  }

  if (!/^[0-9]{14}$/i.test(values.cnpj)) {
    errors.cnpj = 'CNPJ inválido, são necessários 14 digitos'
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'E-mail inválido'
  }
  return errors
}

const Profile: React.FC = () => {
  const form1 = useFormik({
    initialValues: {
      tradeName: '',
      companyName: '',
      cnpj: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2))
    },
  })

  const form2 = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert('entro')
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="profile-container">
      <div className="profile-card">
        <p className="profile-title">Perfil</p>
        <p className="profile-subtitle">
          Modifique aqui os seus dados. Mantenha-os sempre atualizados.
        </p>
        <div className="profile-form-container">
          <form className="profile-form" onSubmit={form1.handleSubmit}>
            <p className="profile-form-title">Alterar dados</p>
            <Form.Field>
              {form1.errors.tradeName ? (
                <div className="profile-error">
                  <p>{form1.errors.tradeName}</p>
                </div>
              ) : null}
              <Form.Control>
                <Icon align="left" className="profile-icon">
                  <FontAwesomeIcon icon={faUser} />
                </Icon>
                <Form.Input
                  placeholder="Nome fantasia"
                  id="tradeName"
                  name="tradeName"
                  className="profile-input"
                  size="medium"
                  onChange={form1.handleChange}
                  value={form1.values.tradeName}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              {form1.errors.companyName ? (
                <div className="profile-error">
                  <p>{form1.errors.companyName}</p>
                </div>
              ) : null}
              <Form.Control fullwidth>
                <Icon align="left" className="profile-icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </Icon>
                <Form.Input
                  placeholder="Razão social"
                  id="companyName"
                  name="companyName"
                  className="profile-input"
                  size="medium"
                  onChange={form1.handleChange}
                  value={form1.values.companyName}
                />
              </Form.Control>
            </Form.Field>

            <Form.Field>
              {form1.errors.cnpj ? (
                <div className="profile-error">
                  <p>{form1.errors.cnpj}</p>
                </div>
              ) : null}
              <Form.Control fullwidth>
                <Icon align="left" className="register-icon">
                  <FontAwesomeIcon icon={faKey} />
                </Icon>
                <Form.Input
                  placeholder="CNPJ"
                  id="cnpj"
                  name="cnpj"
                  className="profile-input"
                  size="medium"
                  onChange={form1.handleChange}
                  value={form1.values.cnpj}
                />
              </Form.Control>
            </Form.Field>

            <Button
              type="submit"
              className="profile-button"
              size="medium"
              onClick={validate}
              fullwidth
            >
              Salvar
            </Button>
          </form>

          <div className="margin" />

          <form className="profile-form" onSubmit={form2.handleSubmit}>
            <p className="profile-form-title">Alterar e-mail</p>
            {form2.errors.email ? (
              <div>
                <p className="register-error">{form2.errors.email}</p>
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
                  onChange={form2.handleChange}
                  value={form2.values.email}
                />
              </Form.Control>
            </Form.Field>
            <Button
              type="submit"
              className="profile-button"
              size="medium"
              onClick={validate}
              fullwidth
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
