import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [person, setPerson] = useState("Student")
    let isLoggedIn = !!token;


    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token")
    }

    const userAuthentication = async () => {
        try {
            const response = await fetch("http://localhost:8000/user2", {
                method: "GET",
                headers: {
                    // Authorization: `Bearer ${token}`,
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ5ZTY2NWYyYTMwMDQzYmUxYWJiZTciLCJpYXQiOjE3MDg3ODIwMDF9.hPgCZDP-BxhHC_HT8wRYH3I7adkD-0NSDrcU9P1UteQ`,
                },
            });

            if (response.ok) {
                const data = await response.json();

                if (data.msg) {
                    localStorage.setItem("USER", JSON.stringify(data.msg));
                    // console.log("1:",data.msg)
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } else {
                console.error("Server returned an error:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };


    useEffect(() => {
        userAuthentication();
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, token, setPerson, person }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};