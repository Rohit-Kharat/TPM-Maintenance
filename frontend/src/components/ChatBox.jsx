import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatBox.css"; // Import CSS for styling

const socket = io("http://localhost:5000"); // Connect to backend server

function ChatBox() {
  // Get the logged-in user's name from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const defaultUsername = storedUser ? storedUser.name : "Guest"; // If no user, default to "Guest"

  const [username, setUsername] = useState(defaultUsername);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("previousMessages", (data) => {
      setMessages(data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("previousMessages");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", { username, message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2>💬 Chat Box</h2>
      <p>
        <strong>Logged in as:</strong> {username}
      </p>{" "}
      {/* Show logged-in user's name */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <strong>{msg.username}: </strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatBox;
