import React, { useEffect } from 'react'
import { Form, Button, Icon, Columns } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faUser,
  faBuilding,
  faKey,
  faLock,
} from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import api from '../../api'

import './styles.css'
import useAuth from '../../hooks/useAuth'

interface EditProfileFormData {
  tradeName: string
  companyName: string
  cnpj: string
  email: string
  password: string
}

const Profile: React.FC = () => {
  const { userId } = useAuth()

  const form1 = useFormik({
    initialValues: {
      tradeName: '',
      companyName: '',
      cnpj: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      tradeName: Yup.string().required('Insira um nome fantasia.'),
      companyName: Yup.string().required('Insira a razão social.'),
      cnpj: Yup.string()
        .required('Insira um CNPJ.')
        .matches(/^\d{14}$/, 'CNPJ Inválido.'),
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

  async function handleSubmit({
    tradeName,
    companyName,
    cnpj,
    email,
    password,
  }: EditProfileFormData) {
    try {
      await api.put(`/contratante/${userId}`, {
        tradeName,
        companyName,
        cnpj,
        email,
        password,
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Não foi possível atualizar seu perfil')
    } finally {
      form1.setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get(`/contratante?id=${userId}`)

      form1.setValues({
        tradeName: response.data.trade_name,
        companyName: response.data.company_name,
        cnpj: response.data.cnpj,
        email: response.data.email,
        password: '',
      })
    }

    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-card">
        <p className="profile-title">Perfil</p>
        <p className="profile-subtitle">
          Modifique aqui os seus dados. Mantenha-os sempre atualizados.
        </p>
        <Columns className="profile-form-container">
          <Columns.Column
            size="half"
            mobile={{
              size: 12,
            }}
          >
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

              {form1.errors.email ? (
                <div>
                  <p className="register-error">{form1.errors.email}</p>
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
                    onChange={form1.handleChange}
                    value={form1.values.email}
                  />
                </Form.Control>
              </Form.Field>

              {form1.errors.password ? (
                <div>
                  <p className="register-error">{form1.errors.password}</p>
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
                    onChange={form1.handleChange}
                    value={form1.values.password}
                  />
                </Form.Control>
              </Form.Field>

              <Button
                type="submit"
                className="profile-button"
                size="medium"
                fullwidth
              >
                Salvar
              </Button>
            </form>
          </Columns.Column>

          {/* <form className="profile-form" onSubmit={form2.handleSubmit}>
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
              fullwidth
            >
              Enviar
            </Button>
          </form> */}
        </Columns>
      </div>
    </div>
  )
}

export default Profile
