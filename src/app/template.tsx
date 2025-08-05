"use client";
import Header from '@/components/UI/Header';
import Navbar from '@/components/UI/Navbar';
import { UserContextProvider } from '@/components/context/userContext';

export default function Template({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <UserContextProvider>
        <Header />
        <Navbar>
          {children}
        </Navbar>
      </UserContextProvider>
    </>
  );
}