"use client"
import { createContext, useContext, useState } from "react";

const CreateStoryContext = createContext(null);

export const CreateStoryButtonProvider = ({ children }) => {
  const [stateButton, setStateButton] = useState(false);


  return (
    <CreateStoryContext.Provider value={{ stateButton, setStateButton }}>
      {children}
    </CreateStoryContext.Provider>
  );
};

export const useCreateStoryButton = () => useContext(CreateStoryContext);
