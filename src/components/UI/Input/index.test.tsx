import { render, screen, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input', () => {
  it('rend l’input avec placeholder', () => {
    render(<Input name="q" placeholder="Rechercher" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Rechercher')).toBeInTheDocument();
  });

  it('transmet la valeur et onChange', () => {
    const onChange = jest.fn();
    render(<Input name="q" value="abc" onChange={onChange} />);
    const input = screen.getByDisplayValue('abc') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'abcd' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('affiche une icône quand icon est fourni', () => {
    render(<Input name="q" id="q" icon="/icons/search.svg" onChange={() => {}} />);
    expect(screen.getByRole('img', { name: 'q' })).toBeInTheDocument();
  });
});


