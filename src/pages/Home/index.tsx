import React, { useEffect, useMemo } from 'react'

import SelectionProcessCard from './SelectionProcessCard'

import { Process } from '../../contexts/processes/types'
import useProcesses from '../../hooks/useProcesses'

import './styles.css'

const areDatesTheSame = (dateA: number, dateB: number) => {
  if (dateA < dateB) return 1
  if (dateA > dateB) return -1
  return 0
}
const compareSelectiveProcesses = (a: Process, b: Process) => {
  const dateA = a.deadline.valueOf()
  const dateB = b.deadline.valueOf()

  return areDatesTheSame(dateA, dateB)
}

const Home: React.FC = () => {
  const { isFetching, processesList, getAllProcesses } = useProcesses()

  const getProcessesBoard = () => {
    if (isFetching) {
      return <div className="process-board-not-found title">Carregando...</div>
    }
    if (processesListSorted.length !== 0) {
      return processesListSorted.map(item => (
        <SelectionProcessCard
          key={item.id}
          title={item.title}
          deadline={item.deadline}
          contact={item.contact}
          description={item.description}
        />
      ))
    }
    return (
      <div className="process-board-not-found title">
        Não há processos seletivos abertos
      </div>
    )
  }
  const processesListSorted = useMemo(
    () => [...processesList].sort(compareSelectiveProcesses),
    [processesList],
  )

  useEffect(() => {
    getAllProcesses()
  }, [])

  return <div className="process-board">{getProcessesBoard()}</div>
}

export default Home
