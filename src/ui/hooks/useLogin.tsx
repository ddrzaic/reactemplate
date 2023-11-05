import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const useLogin = () => {
  const [token, setToken] = React.useState(null);
  const { replace } = useRouter();

  useEffect(() => {
    const cookie = document.cookie;
    const token = cookie.split("=")[1];
    if (!token) {
      replace("/");
    }
    setToken(token);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/auth/adminLogin`,
        {
          username,
          password,
        }
      );

      setToken(data.token);
      document.cookie = `token=${data.token}`;
      replace("/dashboard");
    } catch (e) {
      console.log(e);
      alert("Invalid credentials");
    }
  };

  return { token, login };
};
