import React from 'react'
import { format, isAfter } from 'date-fns'

interface Props {
  title: string
  deadline: Date
  contact: string
  description: string
}

const SelectionProcessCard: React.FC<Props> = ({
  title,
  deadline,
  contact,
  description,
}) => {
  const isDeadlineOver = isAfter(Date.now(), deadline)

  return (
    <div
      className={`card selection-process-card ${
        isDeadlineOver ? 'selection-process-finished' : ''
      }`}
    >
      <div className="header-card">
        <h6 className="title">{title}</h6>
        <div className="gray-text deadline-text">
          {isDeadlineOver
            ? 'Inscrições encerradas: '
            : 'Término das inscrições: '}
          {format(deadline, 'dd/MM/yyyy')}
        </div>
      </div>
      <div className="description-card">{description}</div>
      <div className="gray-text">Contato: {contact}</div>
    </div>
  )
}

export default SelectionProcessCard
