import React, { useEffect, useMemo } from 'react'

import SelectionProcessCard from './SelectionProcessCard'

import { Process } from '../../contexts/processes/types'
import useProcesses from '../../hooks/useProcesses'

import './styles.css'

const compareSelectiveProcesses = (a: Process, b: Process) => {
  const dateA = a.deadline.valueOf()
  const dateB = b.deadline.valueOf()

  // eslint-disable-next-line no-nested-ternary
  return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
}

const Home: React.FC = () => {
  const { isFetching, processesList, getAllProcesses } = useProcesses()

  const processesListSorted = useMemo(
    () => processesList.sort(compareSelectiveProcesses),
    [processesList],
  )

  useEffect(() => {
    getAllProcesses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="process-board">
      {isFetching ? (
        <div className="process-board-not-found title">Carregando...</div>
      ) : processesListSorted.length !== 0 ? (
        processesListSorted.map(item => (
          <SelectionProcessCard
            key={item.id}
            title={item.title}
            deadline={item.deadline}
            contact={item.contact}
            description={item.description}
          />
        ))
      ) : (
        <div className="process-board-not-found title">
          Não há processos seletivos abertos
        </div>
      )}
    </div>
  )
}

export default Home
