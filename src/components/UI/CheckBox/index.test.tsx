import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from './index';

describe('CheckBox', () => {
  it('rend la checkbox non cochée', () => {
    const handleChange = jest.fn();
    render(<CheckBox name="cb" checked={false} onChange={handleChange} />);
    const input = screen.getByRole('checkbox');
    expect(input).not.toBeChecked();
  });

  it('appelle onChange au clic', () => {
    const handleChange = jest.fn();
    render(<CheckBox name="cb" checked={false} onChange={handleChange} />);
    const input = screen.getByRole('checkbox');
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('coche/décoche correctement', () => {
    const { rerender } = render(<CheckBox name="cb" checked={false} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    rerender(<CheckBox name="cb" checked={true} onChange={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});


