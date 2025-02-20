import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    username: null,
    email: null,
    roleId: null,
    isAuthenticated: false
  });

  // Check login status on app start
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUser({
            ...parsedUserData,
            isAuthenticated: true
          });
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (userData) => {
    try {
      const userToStore = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        roleId: userData.roleId
      };

      // Store all user data as a single JSON string
      await AsyncStorage.setItem('userData', JSON.stringify(userToStore));
      
      setUser({
        ...userToStore,
        isAuthenticated: true
      });
    } catch (error) {
      console.error('Login storage error:', error);
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      
      setUser({
        id: null,
        username: null,
        email: null,
        roleId: null,
        isAuthenticated: false
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserData = async (newUserData) => {
    try {
      const currentUserData = await AsyncStorage.getItem('userData');
      if (currentUserData) {
        const parsedCurrentData = JSON.parse(currentUserData);
        const updatedData = { ...parsedCurrentData, ...newUserData };
        
        await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
        setUser({
          ...updatedData,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.error('Update user data error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};