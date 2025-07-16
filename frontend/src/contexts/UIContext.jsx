import { createContext, useState } from "react";
import PropTypes from "prop-types";
export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(false);
  const [scrollOff, setScrollOff] = useState(false);
  return (
    <>
      <UIContext.Provider
        value={{ showNav, setShowNav, scrollOff, setScrollOff }}
      >
        {children}
      </UIContext.Provider>
    </>
  );
};

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
