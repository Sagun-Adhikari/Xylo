
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar"

function Home() {

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("token");

        setUser(null);

        navigate("/login");
    }

    return (
        <>
             <Navbar />

        <div className="home-container">
            <h1>Welcome, {user.username}!</h1>

            <p>Email: {user.email}</p>

            <p>This is your social media dashboard.</p>

            
        </div>
        </>
    );
}

export default Home;
