import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  it('affiche APEX et le champ de recherche', () => {
    render(<Header />);
    expect(screen.getByText('APEX')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Rechercher')).toBeInTheDocument();
  });
});


