import React, { useState } from 'react'
import { Form, Button, Icon, Modal } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import './styles.css'

interface ProcessesFormData {
  title: string
  description: string
  deadline: string
  email: string
}

const validate = values => {
  interface tsTrash {
    [key: string]: string
  }
  const errors: tsTrash = {}
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'E-mail inválido'
  }
  if (values.title === undefined || values.title.length < 1) {
    errors.title = 'Título inválido'
  }
  if (values.description === undefined || values.description.length < 1) {
    errors.description = 'Descrição inválida'
  }
  if (values.deadline === undefined || values.deadline.length < 1) {
    errors.deadline = 'Prazo inválido'
  }

  return errors
}

const EditProcesses: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
      email: '',
    },
    validate,
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  async function handleSubmit({
    title,
    description,
    deadline,
    email,
  }: ProcessesFormData) {
    try {
      // Galera do backend fez isso ai lá no form de Login, n sei ao certo como funciona isso na api
    } finally {
      /*
      formik.setSubmitting(false)
      */
    }
  }

  const [state, setState] = useState(false)
  return (
    <div className="processes-container">
      <div className="processes-card">
        <div className="card-top">
          <div className="w50">
            <p className="processes-title">Editar Processo Seletivo</p>
            <p className="processes-subtitle">
              Atualize aqui os processos seletivos, preenchendo as informações
              necessárias.
            </p>
          </div>
          <div className="remove-button-container w50">
            <Button className="remove-button" onClick={state => setState(true)}>
              Remover
            </Button>
          </div>
        </div>

        <Modal show={state} onClose={() => setState(false)} showClose={false}>
          <Modal.Card>
            <Modal.Card.Header showClose={false}>
              <Modal.Card.Title className="modal-remove-title">
                Remover Processo Seletivo
              </Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
              <Modal.Content className="modal-remove-content">
                <p>
                  Você tem certeza que deseja remover este processo seletivo?
                </p>
              </Modal.Content>
            </Modal.Card.Body>
            <Modal.Card.Footer className="modal-remove-buttons">
              {/* Tentar usar o onClick no Button abaixo para executar a função de chamada da api, mas talvez tenha que
              criar um Form antes.. */}

              <Button>Sim</Button>
              <Button onClick={() => setState(false)}>Não</Button>
            </Modal.Card.Footer>
          </Modal.Card>
        </Modal>

        <form className="processes-form" onSubmit={formik.handleSubmit}>
          <Form.Field>
            {formik.errors.title ? (
              <div className="processes-error">
                <p>{formik.errors.title}</p>
              </div>
            ) : null}
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

          <Form.Field className="w50 margin">
            {formik.errors.deadline ? (
              <div className="processes-error">
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
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

          <Form.Field className="w50">
            {formik.errors.deadline ? (
              <div className="processes-error">
                <p>{formik.errors.deadline}</p>
              </div>
            ) : null}
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

          <Form.Field>
            {formik.errors.description ? (
              <div className="processes-error">
                <p>{formik.errors.description}</p>
              </div>
            ) : null}
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
            size="medium"
            onClick={validate}
            fullwidth
          >
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default EditProcesses
