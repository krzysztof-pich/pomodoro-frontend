import { render, screen } from '@testing-library/react';
import App from './App';

test('Application is rendered', () => {
  render(<App />);

  const header = screen.getByRole('banner');
  expect(header).toBeDefined();

  const linkElement = screen.getByText(/Pomodoro/i);
  expect(linkElement).toBeInTheDocument();
});
