import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../features/authSlice';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    setIsClient(true); // Set this to true once we are on the client
  }, []);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push('/login'); // Navigate to the login page after logout
  };

  // Only render the component if we're on the client
  if (!isClient) {
    return null; // Prevent client-specific logic from running on the server
  }

  return (
    <div className="bg-[#a8d1dc] p-6 flex justify-between items-center">
      <div className="text-lg font-bold">Keep Notes</div>
      <div className="flex space-x-6">
        <button className="text-sm">About</button>
        <button className="text-sm">Notes</button>
        <button className="text-sm">Account</button>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-sm">
            Logout
          </button>
        ) : (
          <Link href="/login">
                <button
                  type="button"
                  >
                    
                  Login
                </button>
              </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
