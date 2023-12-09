import React, { createContext, useState, useContext } from 'react';

const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
    const [filteredCities, setFilteredCities] = useState([]);

    return (
        <CitiesContext.Provider value={{ filteredCities, setFilteredCities }}>
            {children}
        </CitiesContext.Provider>
    );
}

// Custom hook to access the context values
export const useCities = () => {
    return useContext(CitiesContext);
};