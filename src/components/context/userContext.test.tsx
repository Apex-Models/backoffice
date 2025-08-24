import { render, screen } from '@testing-library/react';
import UserContext, { UserContextProvider } from './userContext';
import { useContext } from 'react';

const Consumer = () => {
  const ctx = useContext(UserContext);
  return <div>{ctx?.user ? ctx.user.name : 'no-user'}</div>;
};

describe('UserContext', () => {
  it('fournit un user null par défaut', () => {
    render(
      <UserContextProvider>
        <Consumer />
      </UserContextProvider>
    );
    expect(screen.getByText('no-user')).toBeInTheDocument();
  });
});


