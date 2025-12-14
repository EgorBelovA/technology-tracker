import { createContext, useContext } from 'react';
import { useTechnologies } from '../hooks/useTechnologies';

const TechnologiesContext = createContext(null);

export function TechnologiesProvider({ children }) {
  const tech = useTechnologies();
  return (
    <TechnologiesContext.Provider value={tech}>
      {children}
    </TechnologiesContext.Provider>
  );
}

export function useTech() {
  return useContext(TechnologiesContext);
}
