import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  fullName: string;
  email: string;
  userImage?: string;
}

export const useUser = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userImageUrl, setUserImageUrl] = useState<string>('/default-avatar.png');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.user?.email) {
          const response = await fetch(`/api/users?email=${session.user.email}`);
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            if (userData.userImage?.data) {
              setUserImageUrl(`data:${userData.userImage.contentType};base64,${userData.userImage.data}`);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchUser();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [session, status]);

  return {
    user,
    isLoading,
    userImageUrl,
  };
}; 