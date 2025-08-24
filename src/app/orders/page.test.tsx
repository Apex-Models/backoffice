import { render, screen, act, fireEvent } from '@testing-library/react';
import OrdersPage from './page';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

const stableMockData = {
  data: [
    {
      id: 1,
      customerFirstName: 'John',
      customerLastName: 'Doe',
      customerEmail: 'john@doe.com',
      items: [],
      total: 42,
      orderStatus: 'pending',
      paymentStatus: 'pending',
      address: { street: '1', city: 'Paris', postalCode: '75000', country: 'FR' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  totalMatchedOrders: 1,
  counts: { totalOrders: 1, totalSuccededOrders: 0, totalFailedOrders: 0, totalRefundedOrders: 0 },
  pagination: { currentPage: 1, totalPages: 1, limit: 12, hasNextPage: false, hasPrevPage: false },
  success: true,
  message: ''
};

jest.mock('@/components/hooks/useFetch', () => {
  const fetchData = jest.fn();
  return () => ({ data: stableMockData, fetchData, loading: false, error: null });
});

describe('Orders page', () => {
  it('affiche le titre et le total', async () => {
    await act(async () => { render(<OrdersPage />); });
    expect(screen.getByRole('heading', { name: /Commandes/i })).toBeInTheDocument();
    expect(screen.getByText(/1 Résultat/i)).toBeInTheDocument();
  });

  it('permet de cocher une commande', async () => {
    await act(async () => { render(<OrdersPage />); });
    const checkboxes = screen.getAllByRole('checkbox');
    const first = checkboxes[1];
    fireEvent.click(first);
    expect(first).toBeChecked();
  });
});


