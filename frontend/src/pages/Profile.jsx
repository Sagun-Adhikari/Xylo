import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(function () {
        async function getProfile() {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUser(response.data.user);
        }

        getProfile();
    }, []);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <>
            <Navbar />

            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-picture">
                        {user.profilePicture ? (
                            <img src={user.profilePicture} alt="Profile" />
                        ) : (
                            <span>{user.username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>

                    <h2>{user.username}</h2>
                    <p>{user.email}</p>
                </div>

                <div className="profile-details">
                    <h3>About</h3>
                    <p>{user.bio || "No bio added yet."}</p>

                    <p>
                        <strong>Joined:</strong>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Profile;