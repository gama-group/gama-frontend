import React, { useState } from 'react'

import Header from './Header'
import SelectionProcessCard from './SelectionProcessCard'

const Home: React.FC = () => {
  const [selectionProcess, setSelectionProcess] = useState([
    {
      id: '0',
      deadline: '24/04/2021',
      contact: 'seuemail@email.com.br',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry standard dummy text ever   of Lorem Ipsum.',
    },
    {
      id: '1',
      deadline: '24/04/2021',
      contact: 'seuemail@email.com.br',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesettin industry. Lorem Ipsum has been the industry standard dummy text ever   of Lorem Ipsum.',
    },
  ])

  return (
    <div>
      <Header />
      <div className="list-selection-process">
        {selectionProcess.map(item => (
          <SelectionProcessCard
            key={item.id}
            deadline={item.deadline}
            contact={item.contact}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
