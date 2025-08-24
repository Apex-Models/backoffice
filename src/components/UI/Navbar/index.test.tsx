import { render, screen } from '@testing-library/react';
import Navbar from './index';

jest.mock('next/navigation', () => ({ usePathname: () => '/' }));

describe('Navbar', () => {
  it('affiche les liens principaux', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: /Accueil/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Commandes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Produits/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Clients/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Paramètres/i })).toBeInTheDocument();
  });
});


