import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />);
    expect(screen.getByTestId('count-value')).toHaveTextContent('0');
  });

  it('increments count when plus button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByLabelText('Increase count'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('1');
  });

  it('decrements count when minus button is clicked', () => {
    render(<Counter />);
    fireEvent.click(screen.getByLabelText('Decrease count'));
    expect(screen.getByTestId('count-value')).toHaveTextContent('-1');
  });

  it('handles multiple clicks correctly', () => {
    render(<Counter />);
    const increaseButton = screen.getByLabelText('Increase count');
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    fireEvent.click(increaseButton);
    expect(screen.getByTestId('count-value')).toHaveTextContent('3');
  });
});