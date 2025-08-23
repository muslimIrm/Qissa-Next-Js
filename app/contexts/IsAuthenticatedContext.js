import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import URL from "../URL";
import { toast } from "react-toastify";
import { useCreateStoryButton } from "./CreatStoryContext";
const IsAuthenticatedContext = createContext();

export function IsAuthenticatedProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const verifyToken = async () => {
      try {
        const auth = `Bearer ${token}`;
        const result = await axios.post(`${URL}api/verifytoken`, {}, {
          headers: { Authorization: auth },
        });
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.data.user));
        localStorage.setItem("id", result.data.user._id)
        localStorage.setItem("image", result.data.user.account_icon)
        console.log(result.data)
        setIsAuthenticated(true);
        toast.success("انت مسجل دخول بنجاح!");
      } catch (error) {
        toast.error(error.response?.data?.message || "فشل التحقق من التوكن");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <IsAuthenticatedContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </IsAuthenticatedContext.Provider>
  );
}

export function useIsAuthenticated() {
  return useContext(IsAuthenticatedContext);
}
