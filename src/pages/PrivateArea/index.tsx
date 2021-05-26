/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { Button } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import api from '../../api'
import './styles.css'

interface SelectiveProcess {
  id: number
  method_of_contact: string
  title: string
  deadline: string
}

const PrivateArea: React.FC = () => {
  const [selectiveProcesses, setSelectiveProcesses] = useState<
    SelectiveProcess[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      api.get('processo-seletivo/contratante').then(response => {
        setSelectiveProcesses(Object.values<SelectiveProcess>(response.data))
      })
    }

    fetchData()
  }, [])

  return (
    <div className="private-area">
      <div className="top-container">
        <div className="title-container">
          <h3>Processos Seletivos</h3>
          <div className="subtitle">
            Aqui ficam todos os seus processos seletivos, gerencie-os como
            desejar.
          </div>
        </div>
        <Link to="/processes/create">
          <Button type="button" className="header-button">
            Criar Processo Seletivo
          </Button>
        </Link>
      </div>
      {selectiveProcesses.length !== 0 ? (
        <table className="sp-table">
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>PRAZO</th>
              <th>CONTATO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {selectiveProcesses.map(item => (
              <tr className="sp-table-row" key={item.id}>
                <td>{item.title}</td>
                <td>{item.deadline}</td>
                <td>{item.method_of_contact}</td>
                <td>
                  <FontAwesomeIcon icon={faPen} className="edit-icon" />
                  <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="not-found title">
          Você não tem processos seletivos cadastrados
        </div>
      )}
    </div>
  )
}

export default PrivateArea
