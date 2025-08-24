import { render, screen } from '@testing-library/react';
import MarketingPage from './page';

describe('Marketing page', () => {
  it('affiche Marketing', () => {
    render(<MarketingPage />);
    expect(screen.getByText(/Marketing/i)).toBeInTheDocument();
  });
});


