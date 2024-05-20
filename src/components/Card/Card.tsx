import React from 'react'
import './Card.css'
import Professional from '../Professional/Professional.tsx'
import Schedule from '../Schedule/Schedule.tsx'

const Card = () => {
  return (
    <div className="container">
      <div className="card">
        <Professional />
        <Schedule />
      </div>
    </div>
  );
};

export default Card;