import { render, screen } from '@testing-library/react';
import DiscountsPage from './page';

describe('Discounts page', () => {
  it('affiche Réductions', () => {
    render(<DiscountsPage />);
    expect(screen.getByText(/Réductions/i)).toBeInTheDocument();
  });
});


