import { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/posts",
                { content: content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            onPostCreated(response.data.post);
            setContent("");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={function (e) {
                        setContent(e.target.value);
                    }}
                    required
                />

                <button type="submit">Publish</button>
            </form>
        </div>
    );
}

export default CreatePost;