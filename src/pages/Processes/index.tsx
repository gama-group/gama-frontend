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
    errors.email = 'E-mail inválido'
  }
  if (values.title && values.title !== undefined) {
    errors.title = 'Título inválido'
  }
  if (values.description && values.description !== undefined) {
    errors.description = 'Descrição inválida'
  }
  if (values.deadline && values.deadline !== undefined) {
    errors.deadline = 'Prazo inválido'
  }

  return errors
}

const Processes: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
      email: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: values => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className="processes-container">
      <div className="processes-card">
        <p className="processes-title">Criar Processo Seletivo</p>
        <p className="processes-subtitle">
          Adicione aqui novos processos seletivos, preenchendo as informações
          necessárias.
        </p>
        <form className="processes-form" onSubmit={formik.handleSubmit}>
          {formik.errors.title ? (
            <div>
              <p className="processes-error">{formik.errors.title}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control>
              <Icon align="left" className="processes-icon">
                <div className="title-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.333313 22.3333V25.6667H23.6666V22.3333H0.333313ZM7.83331 15.3333H16.1666L17.6666 19H21.1666L13.25 0.666672H10.75L2.83331 19H6.33331L7.83331 15.3333ZM12 3.96667L15.1166 12.3333H8.88331L12 3.96667Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </Icon>
              <Form.Input
                placeholder="Título"
                id="title"
                name="title"
                className="processes-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.deadline ? (
            <div>
              <p className="processes-error">{formik.errors.email}</p>
            </div>
          ) : null}
          <Form.Field className="w50 margin">
            <Form.Control fullwidth>
              <Icon align="left" className="login-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </Icon>
              <Form.Input
                placeholder="Contato"
                id="email"
                name="email"
                className="processes-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.deadline ? (
            <div>
              <p className="processes-error">{formik.errors.deadline}</p>
            </div>
          ) : null}
          <Form.Field className="w50">
            <Form.Control fullwidth>
              <Form.Input
                placeholder="Prazo"
                id="deadline"
                name="deadline"
                type="date"
                className="processes-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.deadline}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.description ? (
            <div>
              <p className="processes-error">{formik.errors.description}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control fullwidth>
              <Icon align="left" className="processes-icon">
                <div className="title-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 28 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.3334 0.333332H4.00002C2.16669 0.333332 0.683354 1.83333 0.683354 3.66667L0.666687 30.3333C0.666687 32.1667 2.15002 33.6667 3.98335 33.6667H24C25.8334 33.6667 27.3334 32.1667 27.3334 30.3333V10.3333L17.3334 0.333332ZM20.6667 27H7.33335V23.6667H20.6667V27ZM20.6667 20.3333H7.33335V17H20.6667V20.3333ZM15.6667 12V2.83333L24.8334 12H15.6667Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </Icon>
              <Form.Textarea
                placeholder="Descrição"
                id="description"
                name="description"
                className="processes-input input-descricao"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Form.Control>
          </Form.Field>

          <Button
            type="submit"
            className="processes-button"
            onClick={validate}
            fullwidth
          >
            Adicionar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Processes
