import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home page', () => {
  it('affiche Accueil', () => {
    render(<Home />);
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
  });
});


