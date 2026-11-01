
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Post from "../components/Post";

function Profile() {
    const [user, setUser] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(function () {
        async function getProfile() {
            try {
                const token = localStorage.getItem("token");

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                const userResponse = await axios.get(
                    "http://localhost:5000/api/auth/me",
                    config
                );

                const currentUser = userResponse.data.user;
                setUser(currentUser);

                const postResponse = await axios.get(
                    "http://localhost:5000/api/posts",
                    config
                );

                const allPosts = postResponse.data.posts || postResponse.data;

                const filteredPosts = allPosts.filter(function (post) {
                    const authorId =
                        post.author?._id || post.author;

                    return String(authorId) === String(currentUser._id);
                });

                setMyPosts(filteredPosts);

            } catch (error) {
                console.log(error);
                setError("Unable to load profile. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        getProfile();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    Loading profile...
                </p>
            </>
        );
    }

    if (error || !user) {
        return (
            <>
                <Navbar />
                <p style={{ textAlign: "center", marginTop: "50px" }}>
                    {error || "Profile not found."}
                </p>
            </>
        );
    }

    const username = user.username || "User";

    const followersCount = Array.isArray(user.followers)
        ? user.followers.length
        : Number(user.followers || 0);

    const followingCount = Array.isArray(user.following)
        ? user.following.length
        : Number(user.following || 0);

    return (
        <>
            <Navbar />

            <div className="profile-container">

                {/* Profile Header */}

                <div className="profile-header">

                    <div className="profile-picture">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                            />
                        ) : (
                            <span>
                                {username.charAt(0).toUpperCase()}
                            </span>
                        )}
                    </div>

                    <div>
                        <h2>{username}</h2>
                        <p>{user.email}</p>
                        <p>{user.bio || "No bio added yet."}</p>
                    </div>

                </div>

                {/* Profile Statistics */}

                <div className="profile-stats">

                    <div className="profile-stat">
                        <h3>{myPosts.length}</h3>
                        <span>Posts</span>
                    </div>

                    <div className="profile-stat">
                        <h3>{followersCount}</h3>
                        <span>Followers</span>
                    </div>

                    <div className="profile-stat">
                        <h3>{followingCount}</h3>
                        <span>Following</span>
                    </div>

                </div>

                {/* Personal Information */}

                <div className="profile-info">

                    <h3>About Me</h3>

                    <p>
                        <strong>Username:</strong> {username}
                    </p>

                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <p>
                        <strong>Bio:</strong>{" "}
                        {user.bio || "No bio added yet."}
                    </p>

                    <p>
                        <strong>Joined:</strong>{" "}
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "Not available"}
                    </p>

                </div>

                {/* User Posts */}

                <div className="profile-posts">

                    <h3>My Posts</h3>

                    {myPosts.length === 0 ? (
                        <div className="feed-empty">
                            <h3>No posts yet</h3>
                            <p>
                                Your posts will appear here when you
                                share something.
                            </p>
                        </div>
                    ) : (
                        myPosts.map(function (post) {
                            return (
                                <Post
                                    key={post._id}
                                    post={post}
                                />
                            );
                        })
                    )}

                </div>

            </div>
        </>
    );
}

export default Profile;
