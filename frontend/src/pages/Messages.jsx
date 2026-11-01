
import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import { AuthContext } from "../AuthContext";
import Navbar from "../components/Navbar";

function Messages() {
    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef(null);
    const selectedUserRef = useRef(null);

    const token = localStorage.getItem("token");

    // Connect to Socket.IO
    useEffect(function () {
        const socket = io("http://localhost:5000", {
            auth: {
                token: token
            }
        });

        socketRef.current = socket;

        socket.on("connect", function () {
            console.log("Connected to Socket.IO");
        });

        socket.on("connect_error", function (error) {
            console.log("Socket error:", error.message);
        });

        // Receive new messages
        socket.on("newMessage", function (newMessage) {
            const currentChat = selectedUserRef.current;

            if (
                currentChat &&
                String(newMessage.sender) === String(currentChat._id)
            ) {
                setMessages(function (previousMessages) {
                    return [...previousMessages, newMessage];
                });
            }
        });

        return function () {
            socket.disconnect();
        };
    }, []);

    // Get all users
    useEffect(function () {
        async function getUsers() {
            const response = await axios.get(
                "http://localhost:5000/api/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsers(response.data.users);
        }

        getUsers();
    }, []);

    // Get messages when selecting a user
    useEffect(function () {
        async function getMessages() {
            if (!selectedUser) {
                return;
            }

            const response = await axios.get(
                `http://localhost:5000/api/messages/${selectedUser._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessages(response.data.messages);
        }

        getMessages();
    }, [selectedUser]);

    // Select a user
    function handleSelectUser(item) {
        selectedUserRef.current = item;

        setSelectedUser(item);
        setMessages([]);
    }

    // Send message
    async function handleSend(e) {
        e.preventDefault();

        if (!message.trim() || !selectedUser) {
            return;
        }

        const response = await axios.post(
            "http://localhost:5000/api/messages",
            {
                receiver: selectedUser._id,
                message: message
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setMessages(function (previousMessages) {
            return [...previousMessages, response.data.data];
        });

        setMessage("");
    }

    return (
        <>
            <Navbar />

            <div className="messaging-container">

                {/* Users list */}
                <div className="users-list">
                    <h2>Messages</h2>

                    {users.map(function (item) {
                        return (
                            <div
                                className="user-item"
                                key={item._id}
                                onClick={function () {
                                    handleSelectUser(item);
                                }}
                            >
                                <div className="chat-avatar">
                                    {item.username.charAt(0).toUpperCase()}
                                </div>

                                <span>{item.username}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Chat window */}
                <div className="chat-window">

                    {selectedUser ? (
                        <>
                            <div className="chat-header">
                                <h3>{selectedUser.username}</h3>
                            </div>

                            <div className="messages-area">

                                {messages.map(function (item) {
                                    const currentUserId = user._id || user.id;

                                    const isMine =
                                        String(item.sender) === String(currentUserId);

                                    return (
                                        <div
                                            key={item._id}
                                            className={
                                                isMine
                                                    ? "message mine"
                                                    : "message theirs"
                                            }
                                        >
                                            <p>{item.message}</p>

                                            <small>
                                                {new Date(
                                                    item.createdAt
                                                ).toLocaleTimeString()}
                                            </small>
                                        </div>
                                    );
                                })}

                            </div>

                            <form
                                className="message-form"
                                onSubmit={handleSend}
                            >
                                <input
                                    type="text"
                                    placeholder="Write a message..."
                                    value={message}
                                    onChange={function (e) {
                                        setMessage(e.target.value);
                                    }}
                                />

                                <button type="submit">
                                    Send
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="empty-chat">
                            <h2>Select a user</h2>
                            <p>Choose someone to start chatting.</p>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default Messages;
