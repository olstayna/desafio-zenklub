import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../Card/Card'

// Mock dos componentes Professional e Schedule
jest.mock('../Professional/Professional', () => () => <div data-testid="professional">Mocked Professional</div>);
jest.mock('../Schedule/Schedule', () => () => <div data-testid="schedule">Mocked Schedule</div>);

describe('Card Component', () => {
  test('renders Professional and Schedule components', () => {
    render(<Card />);

    // Verifica se os componentes Professional e Schedule foram renderizados
    const professionalElement = screen.getByTestId('professional');
    const scheduleElement = screen.getByTestId('schedule');

    expect(professionalElement).toBeInTheDocument();
    expect(scheduleElement).toBeInTheDocument();
  });
});