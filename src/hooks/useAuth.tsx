import { useEffect, useState } from "react";

type User = {
  id: string;
  email?: string;
  full_name?: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("bizaira_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    window.localStorage.setItem("bizaira_user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    window.localStorage.removeItem("bizaira_user");
    setUser(null);
  };

  return { user, loading, login, logout };
}
