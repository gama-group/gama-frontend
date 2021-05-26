import React from 'react'

interface Props {
  title: string
  deadline: string
  contact: string
}

const SelectiveProcessItemCard: React.FC<Props> = ({
  title,
  deadline,
  contact,
}) => {
  return (
    <div className="card selective-process-card">
      <div className="table-title">TÍTULO</div>
      <div className="table-deadline">PRAZO</div>
      <div className="table-contact">CONTATO</div>
      <div className="table-contact">CONTATO</div>
    </div>
  )
}

export default SelectiveProcessItemCard
