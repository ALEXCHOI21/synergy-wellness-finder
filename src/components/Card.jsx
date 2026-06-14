import React from 'react';

const Card = ({ id, title, description, icon, symptoms, isSelected, onClick }) => {
  return (
    <div 
      className={`concern-card ${isSelected ? 'selected' : ''}`} 
      onClick={() => onClick(id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      <span className="card-icon" aria-hidden="true">{icon}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
      
      <div className="symptom-tag-container">
        {symptoms.map((symptom, index) => (
          <span key={index} className="symptom-tag">
            #{symptom}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
