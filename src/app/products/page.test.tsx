import { render, screen, act, fireEvent } from '@testing-library/react';
import Index from './page';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

const stableMockData = {
  data: [
    { id: 1, name: 'A', description: '', price: 10, type: 't', category: [], status: 'active', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, name: 'B', description: '', price: 20, type: 't', category: [], status: 'inactive', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ],
  totalMatchedProducts: 2,
  counts: { totalProducts: 2, totalActiveProducts: 1, totalInactiveProducts: 1 },
  pagination: { currentPage: 1, totalPages: 1, limit: 12, hasNextPage: false, hasPrevPage: false },
  success: true,
  message: ''
};

jest.mock('@/components/hooks/useFetch', () => {
  const fetchData = jest.fn();
  return () => ({
    data: stableMockData,
    fetchData,
    loading: false,
    error: null
  });
});

describe('Products page', () => {
  it('affiche le total filtré', async () => {
    await act(async () => {
      render(<Index />);
    });
    expect(screen.getByText(/2 Résultats/i)).toBeInTheDocument();
  });

  it('sélectionne un produit via checkbox', async () => {
    await act(async () => {
      render(<Index />);
    });
    const checkboxes = screen.getAllByRole('checkbox');
    const firstProductCheckbox = checkboxes[1];
    fireEvent.click(firstProductCheckbox);
    expect(firstProductCheckbox).toBeChecked();
  });
});


