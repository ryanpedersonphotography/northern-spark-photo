import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import App from './App';

// Mock the window resize event
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: 1024
});

describe('App', () => {
  test('renders the header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Northern Spark Photography/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('navigates between categories', () => {
    render(<App />);
    
    // Initially should show senior portraits
    expect(screen.getByText(/Senior Grads/i)).toBeInTheDocument();
    
    // Click on Families
    fireEvent.click(screen.getByText(/Families/i));
    
    // Should now be showing family photos
    expect(screen.getByText(/Families/i)).toBeInTheDocument();
  });

  test('opens and closes hamburger menu', () => {
    render(<App />);
    
    // Menu should be initially closed
    expect(screen.queryByText(/Premium photography services in Nisswa, MN/i)).not.toBeVisible();
    
    // Open the menu
    const menuButton = screen.getByLabelText(/Menu/i);
    fireEvent.click(menuButton);
    
    // Menu should now be open
    expect(screen.getByText(/Premium photography services in Nisswa, MN/i)).toBeVisible();
    
    // Close the menu
    fireEvent.click(menuButton);
    
    // Menu should be closed again
    expect(screen.queryByText(/Premium photography services in Nisswa, MN/i)).not.toBeVisible();
  });
});