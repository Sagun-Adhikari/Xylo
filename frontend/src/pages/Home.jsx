import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(function () {
        async function getPosts() {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(
                    "http://localhost:5000/api/posts",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setPosts(response.data.posts);

            } catch (error) {
                console.log(error);
            }
        }

        getPosts();
    }, []);

    function handlePostCreated(newPost) {
        setPosts([newPost, ...posts]);
    }

    return (
        <>
            <Navbar />

            <div className="home-container">
                <h1>Home Feed</h1>

                <CreatePost onPostCreated={handlePostCreated} />

                <div className="feed">
                    {posts.length === 0 ? (
                        <p>No posts yet. Be the first to post!</p>
                    ) : (
                        posts.map(function (post) {
                            return (
                                <Post key={post._id} post={post} />
                            );
                        })
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;