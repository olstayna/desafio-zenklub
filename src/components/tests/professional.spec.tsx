import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Professional from '../Professional/Professional';
import fetchMock from 'jest-fetch-mock';

// Mock do componente Rating
jest.mock('../Rating/Rating', () => ({ onClick, isActive }) => (
  <div data-testid="rating-star" onClick={onClick} className={isActive ? 'active' : ''}>
    ★
  </div>
));

describe('Professional Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders loading state initially', async () => {
    render(<Professional />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders professional data after fetch', async () => {
    const mockData = {
      photo: "professional-image.jpg",
      name: "Larissa Mendes",
      profession: "PSICÓLOGA",
      location: "São Paulo",
      numReviews: 20,
      price: 160,
      minutes: 50,
      userText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };
    
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    
    render(<Professional />);
    
    await waitFor(() => {
      expect(screen.getByText(new RegExp(`${mockData.name}`, 'i'))).toBeInTheDocument();
    });

    expect(screen.getByAltText(/imagem do profissional/i)).toHaveAttribute('src', mockData.photo);
    expect(screen.getByText(mockData.profession)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockData.location, 'i'))).toBeInTheDocument();
    expect(screen.getByText(`(${mockData.numReviews}) reviews`)).toBeInTheDocument();
    expect(screen.getByText(`R$${mockData.price}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockData.minutes}`))).toBeInTheDocument();
    expect(screen.getByText(mockData.userText)).toBeInTheDocument();
  });

  test('handles star click interaction', async () => {
    const mockData = {
      photo: "professional-image.jpg",
      name: "Larissa Mendes",
      profession: "PSICÓLOGA",
      location: "São Paulo",
      numReviews: 20,
      price: 160,
      minutes: 50,
      userText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    render(<Professional />);

    expect(await screen.findByText(mockData.name)).toBeInTheDocument();

    const stars = screen.getAllByTestId('rating-star');

    fireEvent.click(stars[2]);

    // Verifica se a terceira estrela e as anteriores estão ativas após o clique
    expect(stars[0]).toHaveClass('active');
    expect(stars[1]).toHaveClass('active');
    expect(stars[2]).toHaveClass('active');
    expect(stars[3]).not.toHaveClass('active');
    expect(stars[4]).not.toHaveClass('active');
  });
});