import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(function () {

        async function getUser() {

            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:5000/api/auth/me",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                    setUser(response.data.user);

                } catch (error) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }

            setLoading(false);
        }

        getUser();

    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;