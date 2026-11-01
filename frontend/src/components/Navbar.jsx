
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    const username = user?.username || "User";

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                xylo
            </Link>

            <div className="navbar-links">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                    to="/messages"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Messages
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Profile
                </NavLink>
            </div>

            <div className="navbar-account">
                <div className="navbar-user">
                    <div className="navbar-avatar">
                        {username.charAt(0).toUpperCase()}
                    </div>

                    <span>{username}</span>
                </div>

                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
