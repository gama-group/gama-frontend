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
      <div className="selection-process-card-header">
        <h6 className="name-text title">{title}</h6>
        <div className="gray-text deadline-text">
          {isDeadlineOver
            ? 'Inscrições encerradas: '
            : 'Término das inscrições: '}
          {format(deadline, 'dd/MM/yyyy')}
        </div>
      </div>
      <div className="description-text">{description}</div>
      <div className="contact-text gray-text">Contato: {contact}</div>
    </div>
  )
}

export default SelectionProcessCard
