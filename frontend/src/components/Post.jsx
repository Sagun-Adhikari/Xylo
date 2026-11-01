function Post({ post }) {
    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-avatar">
                    {post.author?.username?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                    <h3>{post.author?.username || "Unknown User"}</h3>
                    <small>
                        {new Date(post.createdAt).toLocaleString()}
                    </small>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
            </div>
        </div>
    );
}

export default Post;