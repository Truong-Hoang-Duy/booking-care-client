import { useAppSelector } from '@/utils/useGetData';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
  // Check if user is logged in
  // If yes, show route
  // Ortherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
