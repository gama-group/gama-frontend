import React from 'react'

interface Props {
  deadline: string
  contact: string
  description: string
}

const SelectionProcessCard: React.FC<Props> = ({
  deadline,
  contact,
  description,
}) => {
  return (
    <div className="card selection-process-card">
      <div className="header-card">
        <h6 className="title-card">Estágio</h6>
        <div className="gray-text deadline-text">
          Término das inscrições: {deadline}
        </div>
      </div>
      <div className="description-card">{description}</div>
      <div className="gray-text">Contato: {contact}</div>
    </div>
  )
}

export default SelectionProcessCard
