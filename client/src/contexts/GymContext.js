import React, { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import PropTypes from "prop-types";

const GymContext = createContext();

export const useGyms = () => {
  return useContext(GymContext);
};

export const GymProvider = ({ children }) => {
  const [gyms, setGyms] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/gym",
    (response) => {
      setGyms(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  return (
    <GymContext.Provider value={{ gyms, isLoading, error }}>
      {children}
    </GymContext.Provider>
  );
};

GymProvider.propTypes = {
  children: PropTypes.node,
};
