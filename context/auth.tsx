import { useRouter, useSegments } from "expo-router";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { UserType } from "../types";
import { fetchUser } from "../lib/users";

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  setToken: () => {},
});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(token: string | null) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !token &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/(auth)/login");
    } else if (token && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [token, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string>("");

  useProtectedRoute(token);

  React.useEffect(() => {
    async function loadUser() {
      const token = await SecureStore.getItemAsync("token");

      try {
        if (token) {
          setToken(JSON.parse(token));
        }
      } catch (error: any) {
        console.warn("error: ", error.message);
      }
    }
    loadUser();
  }, []);

  

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
