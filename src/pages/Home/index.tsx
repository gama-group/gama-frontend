/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'

import SelectionProcessCard from './SelectionProcessCard'

import api from '../../api'

import './styles.css'

interface SelectiveProcess {
  id: number
  method_of_contact: string
  title: string
  deadline: string
  contact: string
  description: string
}

const Home: React.FC = () => {
  const [selectiveProcesses, setSelectiveProcesses] = useState<
    SelectiveProcess[]
  >([])

  useEffect(() => {
    const fetchData = async () => {
      api.get('findAllProcess').then(response => {
        setSelectiveProcesses(Object.values(response.data))
      })
    }

    fetchData()
  }, [])

  return (
    <div className="list-selection-process">
      {selectiveProcesses.length !== 0 ? (
        selectiveProcesses.map(item => (
          <SelectionProcessCard
            key={item.id}
            title={item.title}
            deadline={item.deadline}
            contact={item.method_of_contact}
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
