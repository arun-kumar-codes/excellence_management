import React, { useEffect, useState, createContext, useContext } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({} as any);

export const AuthContextProvider = (props: any) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect((): any => {
    // @ts-ignore
    const unSubscribe = onAuthStateChanged(auth, setUser, setError);
    return () => unSubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, error }} {...props} />;
};
export const useAuthState = () => {
  const authData = useContext(AuthContext);

  return authData;
};
