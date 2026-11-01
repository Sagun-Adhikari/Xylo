import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <h2>Xylo</h2>

            <div>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <span>{user && user.username}</span>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;