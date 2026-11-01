
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(function () {
        async function getPosts() {
            const response = await axios.get(
                "http://localhost:5000/api/posts",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts(response.data.posts);
            setLoading(false);
        }

        getPosts();
    }, []);

    function handlePostCreated(newPost) {
        setPosts(function (previousPosts) {
            return [newPost, ...previousPosts];
        });
    }

    return (
        <>
            <Navbar />

            <main className="home-container">
                <div className="feed-heading">
                    <div>
                        
                        <h1>Connect. Share. Belong.</h1>
                        <p className="feed-description">
                            Discover fresh perspectives, share your moments, and stay connected with people who matter.
                        </p>
                    </div>
                </div>

                <div className="feed-layout">
                    <section className="feed-main">
                        <CreatePost onPostCreated={handlePostCreated} />

                        <div className="feed-section-heading">
                            <h2>Recent posts</h2>
                            <span>{posts.length} posts</span>
                        </div>

                        {loading ? (
                            <div className="feed-empty">
                                Loading posts...
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="feed-empty">
                                <h3>No posts yet</h3>
                                <p>Be the first person to share something!</p>
                            </div>
                        ) : (
                            <div className="feed">
                                {posts.map(function (post) {
                                    return (
                                        <Post
                                            key={post._id}
                                            post={post}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </section>

                  
                </div>
            </main>
        </>
    );
}

export default Home;
