export type Process = {
  id: number
  title: string
  description: string
  deadline: Date
  contact: string
}

export interface ProcessesContextData {
  processesList: Process[]

  getAllProcesses: () => Promise<void>
}
