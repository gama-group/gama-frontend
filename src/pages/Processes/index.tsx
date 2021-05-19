import React from 'react'
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
        <p className="processs-subtitle">
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
                <FontAwesomeIcon icon={faEnvelope} />
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

          {formik.errors.description ? (
            <div>
              <p className="processes-error">{formik.errors.description}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control fullwidth>
              <Form.Textarea
                placeholder="Descrição"
                id="description"
                name="description"
                className="processes-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </Form.Control>
          </Form.Field>

          {formik.errors.deadline ? (
            <div>
              <p className="processes-error">{formik.errors.deadline}</p>
            </div>
          ) : null}
          <Form.Field>
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

          {formik.errors.deadline ? (
            <div>
              <p className="processes-error">{formik.errors.email}</p>
            </div>
          ) : null}
          <Form.Field>
            <Form.Control fullwidth>
              <Form.Input
                placeholder="E-mail"
                id="email"
                name="email"
                className="processes-input"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Control>
          </Form.Field>

          <Button
            type="submit"
            className="processes-button"
            onClick={validate}
            fullwidth
          >
            Criar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Processes
