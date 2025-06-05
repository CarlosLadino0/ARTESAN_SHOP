import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '../config';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const token = await AsyncStorage.getItem('token');
      const email = await AsyncStorage.getItem('email');
      if (token && email) {
        setUsuario({ email, token });
      }
    };
    cargarUsuario();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );

      const token = response.data.idToken;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', response.data.email);

      setUsuario({ email: response.data.email, token });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
