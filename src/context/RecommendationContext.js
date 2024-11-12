'use client';
import { createContext, useContext, useState } from 'react';

const RecommendationContext = createContext();

export function RecommendationProvider({ children }) {
  const [recommendations, setRecommendations] = useState(null);
  const [risk, setRisk] = useState(null); 
  const [foreignMarketPreference, setForeignMarketPreference] = useState(null)

  return (
    <RecommendationContext.Provider value={{ recommendations, setRecommendations, risk, setRisk, foreignMarketPreference, setForeignMarketPreference }}>
      {children}
    </RecommendationContext.Provider>
  );
}

export function useRecommendations() {
  return useContext(RecommendationContext);
}
