import {  createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [refresh , setRefresh] = useState(false);
    return(
        <AuthContext.Provider value={{isLogin, setIsLogin, user, setUser, setRefresh, refresh}}>
            {children}
        </AuthContext.Provider>
    )
}


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
} 
