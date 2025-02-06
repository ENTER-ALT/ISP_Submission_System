import { LoginData, SessionData, UserType } from "@/types/auth";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "./Loading";
import UserService from "@/services/UserService";
import { ErrorState } from "@/types/errorState";

export interface AuthContextType {
  data: SessionData;
  token: string;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AUTH_CONTEXT = createContext<AuthContextType>(
  {
    data: { email: "", userId: -1, userType: UserType.NONE },
    token: "",
    login: async () => {},
    logout: () => {},
  }
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<SessionData>({ email: "", userId: -1, userType: UserType.NONE });
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("data");

    if (storedToken && storedUserData) {
      setToken(storedToken);
      setData(JSON.parse(storedUserData));
    }
    setIsLoading(false);
  }, []);

  const ROUTER = useRouter();
  const login = async (data: LoginData) => {
    try {
      const response = await UserService.loginUser(data, (error: ErrorState)=>console.error(error));
      if (response.data) {
        setData(response.data);
        setToken(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("data", JSON.stringify(response.data));
        ROUTER.push("/");
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setData({ email: "", userId: -1, userType: UserType.NONE });
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    ROUTER.push("/");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AUTH_CONTEXT.Provider value={{ token, data, login, logout }}>
      {children}
    </AUTH_CONTEXT.Provider>
  );
};

export default React.memo(AuthProvider);

export const useAuth = () => {
  const context = useContext(AUTH_CONTEXT);
  return context;
};
