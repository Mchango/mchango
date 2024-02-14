'use client';

import React, { useState, createContext, useContext } from 'react';

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  isMobileToggled: boolean;
  setIsMobileToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActiveContextSection = createContext<ActiveSectionContextType | null>(
  null
);

const ActiveContext = ({ children }: ActiveSectionContextProviderProps) => {
  const [isMobileToggled, setIsMobileToggled] = useState<boolean>(false);

  return (
    <ActiveContextSection.Provider
      value={{ isMobileToggled, setIsMobileToggled }}
    >
      {' '}
      {children}{' '}
    </ActiveContextSection.Provider>
  );
};

export const useActiveContext = () => {
  const context = useContext(ActiveContextSection);
  if (context === null) {
    throw new Error(
      'useActiveContext must be used within an ActiveContextProvider'
    );
  }
  return context;
};

export default ActiveContext;
