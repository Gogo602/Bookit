import checkAuth from "@/app/actions/checkAuth";
import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            const { isAuthenticated, user } = await checkAuth();
            setIsAuthenticated(isAuthenticated);
            setCurrentUser(currentUser);
        }

        checkAuthentication();
    }, [])
    

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            currentUser,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};
 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};