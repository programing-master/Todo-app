import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

vi.mock('../hooks/useAuth');

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render Login and Register links when not authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: false,
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('should render Logout link when authenticated', () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('should call logout function when Logout link is clicked', () => {
    const logoutMock = vi.fn();
    
    useAuth.mockReturnValue({
      isAuthenticated: true,
      logout: logoutMock,
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/logout/i));

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
