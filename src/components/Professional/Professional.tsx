import React, { useState, useEffect } from 'react';
import './Professional.css';
import Rating from '../Rating/Rating.tsx';

const items: number[] = [...(new Array(5).keys() as any)];

const Professional = () => {
  const [professionalData, setProfessionalData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    const fetchPofessional = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/professional');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProfessionalData(data);
      } catch (error) {
        console.error('Error fetching professional data:', error);
      }
    };

    fetchPofessional();
  }, []);

  const onClickStar = (index: number) => {
    setActiveIndex(oldState => oldState === index ? undefined : index);
  }

  return (
    <div className="professional-container">
      {professionalData ? (
        <div className="professional">
          <img
            className="profile-image"
            src={professionalData.photo}
            alt="Imagem do Profissional"
          />
          <div className="professional-info">
            <h2 className="professional-name">{professionalData.name}</h2>
            <p className="profession-info">
              <span className="profession">{professionalData.profession}</span> | {professionalData.location}
            </p>
            <div className="rating-container">
              {items.map(index => (
                <Rating
                  onClick={() => onClickStar(index)}
                  key={`rating_${index}`}
                  isActive={index <= activeIndex!}
                />
              ))}
              <span className="review-count">({professionalData.numReviews}) reviews</span>
            </div>
            <p className="price"><span className="price-bold">R${professionalData.price}</span> / <span className="time">{professionalData.time}</span> minutos</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <p className="bio">
        {professionalData && professionalData.bio}
      </p>
    </div>
  );
};

export default Professional;
