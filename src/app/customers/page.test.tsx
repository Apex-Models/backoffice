import { render, screen, act, fireEvent } from '@testing-library/react';
import CustomersPage from './page';

jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }));

const stableMockData = {
  data: [
    {
      id: 1,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@doe.com',
      orderSummary: { totalOrders: 2, totalSpent: 100 },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  totalMatchedUsers: 1,
  counts: { totalUsers: 1, totalActiveUsers: 1, totalUsersWithOrders: 1, totalUsersWithoutOrders: 0, totalSpent: 100 },
  pagination: { currentPage: 1, totalPages: 1, limit: 12, hasNextPage: false, hasPrevPage: false },
  success: true,
  message: ''
};

jest.mock('@/components/hooks/useFetch', () => {
  const fetchData = jest.fn();
  return () => ({ data: stableMockData, fetchData, loading: false, error: null });
});

describe('Customers page', () => {
  it('affiche le titre et le total', async () => {
    await act(async () => { render(<CustomersPage />); });
    expect(screen.getByRole('heading', { name: /Clients/i })).toBeInTheDocument();
    expect(screen.getByText(/1 Résultat/i)).toBeInTheDocument();
  });

  it('permet de cocher un client', async () => {
    await act(async () => { render(<CustomersPage />); });
    const checkboxes = screen.getAllByRole('checkbox');
    const first = checkboxes[1];
    fireEvent.click(first);
    expect(first).toBeChecked();
  });
});


