import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  it('rend le titre', () => {
    render(<Button title="Clique" type="button" handleClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Clique' })).toBeInTheDocument();
  });

  it('déclenche handleClick', () => {
    const onClick = jest.fn();
    render(<Button title="OK" type="button" handleClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('applique la variante unavailable', () => {
    render(<Button title="Off" type="button" handleClick={() => {}} style="unavailable" />);
    expect(screen.getByRole('button', { name: 'Off' })).toBeInTheDocument();
  });
});


