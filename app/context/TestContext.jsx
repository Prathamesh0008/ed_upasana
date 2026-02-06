// app/context/TestContext.jsx
'use client';
import React, { createContext, useContext } from 'react';

const TestContext = createContext();

export const TestProvider = ({ children }) => {
  return (
    <TestContext.Provider value={{ test: 'hello' }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTest = () => useContext(TestContext);