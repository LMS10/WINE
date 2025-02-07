// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';

// interface AuthContextType {
//   isLoggedIn: boolean;
//   profileImage: string | null;
//   setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const authContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(authContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profileImage, setProfileImage] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       setIsLoggedIn(true);
//       const fetchUserData = async () => {
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me`, {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to fetch user data');
//           }

//           const data = await response.json();
//           setProfileImage(data.image);
//         } catch (error) {
//           console.error('Error fetching profile image:', error);
//         }
//       };

//       if (process.env.NEXT_PUBLIC_BASE_URL) {
//         fetchUserData();
//       } else {
//         console.error('BASE_URL is not defined');
//       }
//     }
//   }, []);
//   return <authContext.Provider value={{ isLoggedIn, profileImage, setIsLoggedIn, setProfileImage }}>{children}</authContext.Provider>;
// }
