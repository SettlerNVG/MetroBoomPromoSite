import { useState } from 'react'
import './Team.css'

const teamMembers = [
  {
    id: 1,
    name: 'Кочетов Денис',
    role: 'PM и геймдизайнер',
    roleEn: 'Project Manager & Game Designer',
    image: '/images/denis.jpg',
    highlighted: true
  },
  {
    id: 2,
    name: 'Иманаков Владислав',
    role: 'PM и программист',
    roleEn: 'Project Manager',
    image: '/images/vladislav.jpg',
    highlighted: true
  },
  {
    id: 3,
    name: 'Антонов Владимир',
    role: 'Сценарист',
    roleEn: 'Scriptwriter',
    image: '/images/vladimir.jpg',
    highlighted: true
  },
  {
    id: 4,
    name: 'Догадин Никита',
    role: 'DevOps',
    roleEn: 'DevOps Engineer',
    image: '/images/nikita.jpg',
    highlighted: true
  }
]

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null)

  return (
    <section id="team" className="section team">
      <h2 className="section-title">Команда</h2>
      <p className="section-subtitle">Разработчики Metro Boom</p>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div 
            key={member.id}
            className={`team-card ${member.highlighted ? 'highlighted' : ''}`}
            onClick={() => setSelectedMember(member)}
          >
            <div className="team-photo">
              <img src={member.image} alt={member.name} loading="lazy" />
            </div>
            <h3>{member.name}</h3>
            <p className={`role ${member.highlighted ? 'orange-text' : 'cyan-text'}`}>
              {member.role}
            </p>
            <p className="description">{member.roleEn}</p>
          </div>
        ))}
      </div>

      {selectedMember && (
        <div className="modal" onClick={() => setSelectedMember(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMember(null)}>×</button>
            <img src={selectedMember.image} alt={selectedMember.name} />
            <h3>{selectedMember.name}</h3>
            <p className="role">{selectedMember.role}</p>
            <p>{selectedMember.roleEn}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Team
