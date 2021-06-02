import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useHistory, useParams } from 'react-router-dom'
import { Form, Button, Icon, Modal, Columns } from 'react-bulma-components'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import useProcesses from '../../hooks/useProcesses'
import useAuth from '../../hooks/useAuth'

import './styles.css'

interface EditProcessParams {
  id: string
}

interface EditProcessFormData {
  title: string
  description: string
  deadline: string
  contact: string
}

const EditProcess: React.FC = () => {
  const { id: selectiveProcessId } = useParams<EditProcessParams>()

  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
      contact: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Insira um título.'),
      description: Yup.string().required('Insira uma descrição.'),
      deadline: Yup.date().required('Insira um prazo.'),
      contact: Yup.string()
        .email('Endereço de e-mail inválido.')
        .required('Insira um e-mail.'),
    }),
    validateOnChange: false,
    onSubmit: handleSubmit,
  })

  const { userId } = useAuth()
  const {
    firstProcess: process,
    getProcessById,
    updateProcess,
    deleteProcess,
  } = useProcesses()

  const [modalOpen, setModalOpen] = useState(false)

  async function handleSubmit({
    title,
    description,
    deadline,
    contact,
  }: EditProcessFormData) {
    try {
      await updateProcess(
        Number(selectiveProcessId),
        title,
        description,
        new Date(deadline),
        contact,
      )

      toast.success('Processo seletivo atualizado com sucesso!')
    } catch {
      toast.error('Não foi possível criar este processo seletivo')
    } finally {
      formik.setSubmitting(false)
      history.push('/processes')
    }
  }

  async function handleDelete() {
    try {
      await deleteProcess(Number(selectiveProcessId))
      toast.success('Processo seletivo excluido!')
    } catch {
      toast.error('Não foi possível deletar este processo')
    } finally {
      history.push('/processes')
    }
  }

  useEffect(() => {
    getProcessById(Number(selectiveProcessId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!process) return

    formik.setValues({
      title: process.title,
      description: process.description,
      deadline: format(process.deadline, 'yyyy-MM-dd'),
      contact: process.contact,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process])

  return (
    <div className="edit-process-container">
      {!process ? (
        <div className="not-found title">Carregando...</div>
      ) : process.contractorId === Number(userId) ? (
        <div className="edit-process-card">
          <div className="card-top">
            <div>
              <p className="edit-process-title">Editar Processo Seletivo</p>
              <p className="edit-process-subtitle">
                Atualize aqui os processos seletivos, preenchendo as informações
                necessárias.
              </p>
            </div>
            <div className="remove-button-container">
              <Button
                className="remove-button"
                onClick={() => setModalOpen(true)}
              >
                Remover
              </Button>
            </div>
          </div>

          <Modal
            show={modalOpen}
            onClose={() => setModalOpen(false)}
            showClose={false}
          >
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

                <Button onClick={handleDelete}>Sim</Button>
                <Button onClick={() => setModalOpen(false)}>Não</Button>
              </Modal.Card.Footer>
            </Modal.Card>
          </Modal>

          <form className="edit-process-form" onSubmit={formik.handleSubmit}>
            <Columns>
              <Columns.Column size={12}>
                <Form.Field>
                  {formik.errors.title ? (
                    <div className="edit-process-error">
                      <p>{formik.errors.title}</p>
                    </div>
                  ) : null}
                  <Form.Control>
                    <Icon align="left" className="edit-process-icon">
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
                      className="edit-process-input"
                      size="medium"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>

              <Columns.Column size={12}>
                <Columns>
                  <Columns.Column size="half" mobile={{ size: 12 }}>
                    <Form.Field className="w50 margin">
                      {formik.errors.deadline ? (
                        <div className="edit-process-error">
                          <p>{formik.errors.contact}</p>
                        </div>
                      ) : null}
                      <Form.Control fullwidth>
                        <Icon align="left" className="login-icon">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </Icon>
                        <Form.Input
                          placeholder="Contato"
                          id="contact"
                          name="contact"
                          className="edit-process-input"
                          size="medium"
                          onChange={formik.handleChange}
                          value={formik.values.contact}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>

                  <Columns.Column>
                    <Form.Field className="w50">
                      {formik.errors.deadline ? (
                        <div className="edit-process-error">
                          <p>{formik.errors.deadline}</p>
                        </div>
                      ) : null}
                      <Form.Control fullwidth>
                        <Form.Input
                          placeholder="Prazo"
                          id="deadline"
                          name="deadline"
                          type="date"
                          className="edit-process-input"
                          size="medium"
                          onChange={formik.handleChange}
                          value={formik.values.deadline}
                        />
                      </Form.Control>
                    </Form.Field>
                  </Columns.Column>
                </Columns>
              </Columns.Column>

              <Columns.Column size={12}>
                <Form.Field>
                  {formik.errors.description ? (
                    <div className="edit-process-error">
                      <p>{formik.errors.description}</p>
                    </div>
                  ) : null}
                  <Form.Control fullwidth>
                    <Icon align="left" className="edit-process-icon">
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
                      className="edit-process-input input-descricao"
                      size="medium"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                    />
                  </Form.Control>
                </Form.Field>
              </Columns.Column>

              <Columns.Column>
                <Button
                  type="submit"
                  className="edit-process-button"
                  loading={formik.isSubmitting}
                  fullwidth
                >
                  Salvar
                </Button>
              </Columns.Column>
            </Columns>
          </form>
        </div>
      ) : (
        <div className="not-found title">
          Você não possui permissão para editar este processo seletivo.
        </div>
      )}
    </div>
  )
}

export default EditProcess
