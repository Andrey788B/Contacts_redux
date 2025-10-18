import { render, screen } from '@testing-library/react';
import { MainApp } from './MainApp';

test('renders header', () => {
  render(<MainApp />);
  const headerElement = screen.getByText(/контакты/i);
  expect(headerElement).toBeInTheDocument();
});