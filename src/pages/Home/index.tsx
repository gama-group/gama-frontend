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
  const { processesList, getAllProcesses } = useProcesses()

  const processesListSorted = useMemo(
    () => processesList.sort(compareSelectiveProcesses),
    [processesList],
  )

  useEffect(() => {
    getAllProcesses()
  }, [])

  return (
    <div className="list-selection-process">
      {processesListSorted.length !== 0 ? (
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
        <div className="not-found title">
          Não há processos seletivos abertos
        </div>
      )}
    </div>
  )
}

export default Home
