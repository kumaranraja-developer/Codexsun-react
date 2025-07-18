// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(); // fetch user again on reload
    }
  }, []);

  // const fetchUser = async () => {
  //   try {
  //     const res = await apiClient.get("/api/user");
  //     setUser(res.data);
  //   } catch (err) {
  //     console.error("Failed to fetch user:", err);
  //     // logout(); // Invalid token
  //   }
  // };
  const fetchUser = async () => {
    const token = localStorage.getItem("token"); // Or get from context/state

    if (!token) {
      console.warn("No token found");
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setUser(res.data); // Make sure `setUser` is available in your scope
    } catch (err) {
      console.error("Failed to fetch user:", err);
      // Optionally handle logout or redirect
    }
  };

  const login = (userData: any, tokenData: string) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
