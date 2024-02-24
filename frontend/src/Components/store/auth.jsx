import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [person, setPerson] = useState("Student")
    const isLoggedIn = !!token;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    }

    const userAuthentication = async () => {
        let response;
        try {
            if (person === "Student") {
                response = await fetch("http://localhost:8000/user2", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else if (person === "Teacher") {
                response = await fetch("http://localhost:8000/user1", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else if (person === "Admin") {
                response = await fetch("http://localhost:8000/user3", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            if (!response.ok) {
                console.error("Server returned an error:", response.status, response.statusText);
                // You might want to throw an error or handle it in some way
            }

            const data = await response.json();
            
            if (data.msg) {
                localStorage.setItem("USER", JSON.stringify(data.msg));
            } else {
                console.error("Unexpected API response format:", data);
            }
        } catch (error) {
            console.error("Error during user authentication:", error);
        }
    };

    useEffect(() => {
        if (token) {
            userAuthentication();
        }
    }, [token, person]);

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
