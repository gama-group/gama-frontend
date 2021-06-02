export type Process = {
  id: number
  title: string
  description: string
  deadline: Date
  contact: string
  contractorId?: number
}

export interface GetAllProcessesResponse {
  id: number
  title: string
  description: string
  deadline: string
  // eslint-disable-next-line camelcase
  method_of_contact: string
}

export type GetProcessesByContractor = GetAllProcessesResponse
export interface GetProcessById extends GetAllProcessesResponse {
  // eslint-disable-next-line camelcase
  id_contractor: number
}
export interface CreateProcessResponse extends GetAllProcessesResponse {
  // eslint-disable-next-line camelcase
  id_contractor: number
}

export interface UpdateProcessResponse extends GetAllProcessesResponse {
  // eslint-disable-next-line camelcase
  id_contractor: number
}

export interface DeleteProcessResponse extends GetAllProcessesResponse {
  // eslint-disable-next-line camelcase
  id_contractor: number
}

export interface ProcessesContextData {
  isFetching: boolean
  processesList: Process[]
  firstProcess?: Process

  getAllProcesses: () => Promise<void>
  getProcessesByContractor: (contractorId: number) => Promise<void>
  getProcessById: (id: number) => Promise<void>
  createProcess: (
    title: string,
    description: string,
    deadline: Date,
    contact: string,
  ) => Promise<void>
  updateProcess: (
    id: number,
    title: string,
    description: string,
    deadline: Date,
    contact: string,
  ) => Promise<void>
  deleteProcess: (id: number) => Promise<void>
}
