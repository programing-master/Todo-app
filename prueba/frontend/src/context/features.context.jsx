import { createContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const FeaturesContext = createContext();

export const FeaturesProvider = ({ children }) => {
  const editableDivRef = useRef(null);
  const [showPlaceHolder, setShowPlaceHolder] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <FeaturesContext.Provider
      value={{
        editableDivRef,
        showPlaceHolder,
        setShowPlaceHolder,
        open,
        setOpen,
      }}
    >{children}</FeaturesContext.Provider>
  );
};
