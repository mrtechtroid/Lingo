import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Logic to check if the user is authenticated
    const token = localStorage.getItem('token'); // Check for JWT token
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};