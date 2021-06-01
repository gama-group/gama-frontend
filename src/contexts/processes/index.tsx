import React, { createContext, useCallback, useState, useMemo } from 'react'
import { parse, format } from 'date-fns'

import api from '../../api'
import {
  Process,
  ProcessesContextData,
  GetAllProcessesResponse,
  GetProcessesByContractor,
  GetProcessById,
  CreateProcessResponse,
  UpdateProcessResponse,
  DeleteProcessResponse,
} from './types'

const ProcessesContext = createContext<ProcessesContextData>(
  {} as ProcessesContextData,
)

export const ProcessesProvider: React.FC = ({ children }) => {
  const [processes, setProcesses] = useState<Process[]>([])

  const getAllProcesses = useCallback(async () => {
    const response = await api.get<GetAllProcessesResponse[]>(
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

  const getProcessesByContractor = useCallback(async (contractorId: number) => {
    const response = await api.get<GetProcessesByContractor[]>(
      `/processo-seletivo/${contractorId}`,
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

  const getProcessById = useCallback(async (id: number) => {
    const response = await api.get<GetProcessById>(
      `/processo-seletivo?id=${id}`,
    )

    const process = response.data

    setProcesses([
      {
        id: process.id,
        title: process.title,
        description: process.description,
        deadline: parse(process.deadline, 'dd/MM/yyyy', new Date()),
        contact: process.method_of_contact,
        contractorId: process.id_contractor,
      },
    ])
  }, [])

  const createProcess = useCallback(
    async (
      title: string,
      description: string,
      deadline: Date,
      contact: string,
    ) => {
      await api.post<CreateProcessResponse>('/processo-seletivo', {
        title,
        description,
        deadline: format(deadline, 'dd/MM/yyyy'),
        method_of_contact: contact,
      })
    },
    [],
  )

  const updateProcess = useCallback(
    async (
      id: number,
      title: string,
      description: string,
      deadline: Date,
      contact: string,
    ) => {
      await api.put<UpdateProcessResponse>(`/processo-seletivo/${id}`, {
        title,
        description,
        deadline: format(deadline, 'dd/MM/yyyy'),
        method_of_contact: contact,
      })
    },
    [],
  )

  const deleteProcess = useCallback(async (id: number) => {
    await api.delete<DeleteProcessResponse>(`/processo-seletivo/${id}`)
  }, [])

  const processesList = useMemo(() => processes, [processes])
  const firstProcess = useMemo(
    () => (processes.length > 0 ? processes[0] : undefined),
    [processes],
  )

  return (
    <ProcessesContext.Provider
      value={{
        processesList,
        firstProcess,
        getAllProcesses,
        getProcessesByContractor,
        getProcessById,
        createProcess,
        updateProcess,
        deleteProcess,
      }}
    >
      {children}
    </ProcessesContext.Provider>
  )
}

export default ProcessesContext
