import { useContext } from 'react'

import ProcessesContext from '../contexts/processes'
import { ProcessesContextData } from '../contexts/processes/types'

const useProcesses = (): ProcessesContextData => {
  const processesContext = useContext(ProcessesContext)

  if (!processesContext) {
    throw new Error('useProcesses only can be used within ProcessesProvider')
  }

  return processesContext
}

export default useProcesses
