import { render, screen } from '@testing-library/react';
import App from './App';
import ChipInput from './ChipInput';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
