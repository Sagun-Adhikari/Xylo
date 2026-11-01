
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";

function Post({ post }) {
    const { user } = useContext(AuthContext);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    function handleLike() {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    }

    const username = post.author?.username || "Unknown User";
    const currentUserId = user?._id || user?.id;
    const isMyPost =
        String(post.author?._id) === String(currentUserId);

    return (
        <article className="post-card">
            <div className="post-header">
                <div className="post-avatar">
                    {username.charAt(0).toUpperCase()}
                </div>

                <div className="post-user-info">
                    <h3>{username}</h3>
                    <small>
                        {new Date(post.createdAt).toLocaleString()}
                    </small>
                </div>

                {isMyPost && (
                    <span className="my-post-label">Your post</span>
                )}
            </div>

            <div className="post-content">
                <p>{post.content}</p>
            </div>

            <div className="post-stats">
                <span>{likes} likes</span>
            </div>

            <div className="post-actions">
                <button
                    type="button"
                    className={liked ? "like-button liked" : "like-button"}
                    onClick={handleLike}
                >
                    <span>{liked ? "♥" : "♡"}</span>
                    {liked ? "Liked" : "Like"}
                </button>

                <button
                    type="button"
                    className="comment-button"
                    disabled
                    title="Comments coming soon"
                >
                    <span>▢</span>
                    Comment
                </button>

                <button
                    type="button"
                    className="share-button"
                    disabled
                    title="Sharing coming soon"
                >
                    <span>↗</span>
                    Share
                </button>
            </div>
        </article>
    );
}

export default Post;
