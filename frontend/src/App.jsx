
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

import { AuthContext } from "./AuthContext";

function ProtectedRoute({ children }) {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

function App() {

    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
