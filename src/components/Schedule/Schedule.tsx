import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Slider from 'react-slick';
import { format, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './Schedule.css';

interface DayInfo {
  label: string;
  date: string;
}

const Schedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [daysOfWeek, setDaysOfWeek] = useState<DayInfo[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const start = today;
    const end = endOfMonth(today);
    const days = eachDayOfInterval({ start, end });

    const formattedDays: DayInfo[] = days.map(day => ({
      label: format(day, 'EEE', { locale: ptBR }).slice(0, 3),
      date: format(day, 'MMM dd', { locale: ptBR }),
    }));

    const todayIndex = formattedDays.findIndex(day => day.date === format(today, 'MMM dd', { locale: ptBR }));
    const reorderedDays = [...formattedDays.slice(todayIndex), ...formattedDays.slice(0, todayIndex)];

    setDaysOfWeek(reorderedDays);

    // Simular a solicitação dos horários disponíveis do servidor
    fetch('http://localhost:3002/available-slots')
      .then(response => response.json())
      .then(data => setAvailableTimes(data))
      .catch(error => console.error('Error fetching available slots:', error));
  }, []);

  const handleDayClick = (index: number) => {
    setSelectedDay(index);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    afterChange: (index: number) => setSelectedDay(index),
    prevArrow: selectedDay === 0 ? <SamplePrevArrow disabled /> : <SamplePrevArrow />,
    nextArrow: selectedDay === daysOfWeek.length - 4 ? <SampleNextArrow disabled /> : <SampleNextArrow />,
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="title">Agende sua sessão!</div>
        <div className="subtitle">Timezone: São Paulo (GMT-3)</div>
      </div>

      <Slider {...sliderSettings} className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={`day`}
            onClick={() => handleDayClick(index)}
          >
            <div className="day-label">{day.label}</div>
            <div className="date">{day.date}</div>
          </div>
        ))}
      </Slider>

      <div className="available-times">
        {availableTimes.map((time, index) => (
          <div
            key={index}
            className={`times ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

function SampleNextArrow({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) {
  return (
    <div className={`arrow arrow-right ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      <IoIosArrowForward />
    </div>
  );
}

function SamplePrevArrow({ onClick, disabled }: { onClick?: () => void, disabled?: boolean }) {
  return (
    <div className={`arrow arrow-left ${disabled ? 'disabled' : ''}`} onClick={onClick}>
      <IoIosArrowBack />
    </div>
  );
}

export default Schedule;