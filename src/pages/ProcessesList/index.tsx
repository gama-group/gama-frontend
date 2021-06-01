import React, { useEffect } from 'react'
import { Button } from 'react-bulma-components'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

import useProcesses from '../../hooks/useProcesses'
import useAuth from '../../hooks/useAuth'

import './styles.css'

const ProcessesList: React.FC = () => {
  const { userId } = useAuth()

  const { processesList, getProcessesByContractor } = useProcesses()

  useEffect(() => {
    getProcessesByContractor(Number(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="processes-list">
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
      {processesList.length !== 0 ? (
        <div style={{ overflowX: 'auto' }}>
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
              {processesList.map(item => (
                <tr className="sp-table-row" key={item.id}>
                  <td>{item.title}</td>
                  <td>{format(item.deadline, 'dd/MM/yyyy')}</td>
                  <td>{item.contact}</td>
                  <td>
                    <Link to={`/processes/${item.id}/edit`}>
                      <FontAwesomeIcon icon={faPen} className="edit-icon" />
                    </Link>
                    <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="not-found title">
          Você não tem processos seletivos cadastrados
        </div>
      )}
    </div>
  )
}

export default ProcessesList
