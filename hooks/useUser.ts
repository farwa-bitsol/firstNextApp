import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  id: string;
  fullName: string;
  email: string;
  userImage?: string;
}

export const useUser = () => {
  const session = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userImageUrl, setUserImageUrl] = useState<string>('/default-avatar.png');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (session?.data?.user?.email) {
          const response = await fetch(`/api/users?email=${session.data.user.email}`);
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

    if (session?.status === 'authenticated' && session?.data) {
      fetchUser();
    } else if (session?.status === 'unauthenticated' || !session?.data) {
      setIsLoading(false);
    }
  }, [session]);

  return {
    user,
    isLoading,
    userImageUrl,
  };
}; 