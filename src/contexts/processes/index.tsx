import React, { createContext, useCallback, useState, useMemo } from 'react'
import { parse } from 'date-fns'

import api from '../../api'
import { Process, ProcessesContextData } from './types'

const ProcessesContext = createContext<ProcessesContextData>(
  {} as ProcessesContextData,
)

interface GetProcessesResponse {
  id: number
  title: string
  description: string
  deadline: string
  // eslint-disable-next-line camelcase
  method_of_contact: string
}

export const ProcessesProvider: React.FC = ({ children }) => {
  const [processes, setProcesses] = useState<Process[]>([])

  const getAllProcesses = useCallback(async () => {
    const response = await api.get<GetProcessesResponse[]>(
      '/processo-seletivo/todos',
    )

    setProcesses(
      response.data.map(process => ({
        id: process.id,
        title: process.title,
        description: process.description,
        deadline: parse(process.deadline, 'dd/MM/yyyy', new Date()),
        contact: process.method_of_contact,
      })),
    )
  }, [])

  const processesList = useMemo(() => processes, [processes])

  return (
    <ProcessesContext.Provider value={{ processesList, getAllProcesses }}>
      {children}
    </ProcessesContext.Provider>
  )
}

export default ProcessesContext
