import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Kaizen.css"; // Updated CSS

const Kaizen = () => {
    const [beforeImage, setBeforeImage] = useState(null);
    const [afterImage, setAfterImage] = useState(null);
    const [description, setDescription] = useState("");
    const [kaizenPosts, setKaizenPosts] = useState([]);

    useEffect(() => {
        fetchKaizenPosts();
    }, []);

    const fetchKaizenPosts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/kaizen");
            setKaizenPosts(response.data);
        } catch (error) {
            console.error("Error fetching Kaizen posts:", error);
        }
    };

    const handleFileChange = (e, setImage) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("beforeImage", beforeImage);
        formData.append("afterImage", afterImage);
        formData.append("description", description);

        try {
            await axios.post("http://localhost:5000/kaizen", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Kaizen post uploaded successfully!");
            setBeforeImage(null);
            setAfterImage(null);
            setDescription("");
            fetchKaizenPosts(); // Refresh posts
        } catch (error) {
            console.error("Error uploading Kaizen post:", error);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Kaizen post?")) {
            try {
                await axios.delete(`http://localhost:5000/kaizen/${id}`);
                setKaizenPosts(kaizenPosts.filter(post => post._id !== id));
                alert("✅ Kaizen post deleted successfully!");
            } catch (error) {
                console.error("❌ Error deleting Kaizen post:", error);
                alert("Error deleting Kaizen post.");
            }
        }
    };

    return (
        <div className="kaizen-container">
            <h2>📌 Kaizen Improvements</h2>

            {/* Upload Form */}
            <form className="kaizen-form" onSubmit={handleSubmit}>
                <label>Before Image:</label>
                <input type="file" onChange={(e) => handleFileChange(e, setBeforeImage)} required />

                <label>After Image:</label>
                <input type="file" onChange={(e) => handleFileChange(e, setAfterImage)} required />

                <textarea
                    placeholder="Describe what improvements were made..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>

                <button type="submit">Upload Kaizen</button>
            </form>

            {/* Kaizen Feed */}
            <div className="kaizen-feed">
                {kaizenPosts.length > 0 ? (
                    kaizenPosts.map((post, index) => (
                        <div key={index} className="kaizen-post">
                            <div className="kaizen-images">
                                <div className="image-container">
                                    <span className="image-label before">Before</span>
                                    <img src={`http://localhost:5000${post.beforeImage}`} alt="Before" />
                                </div>
                                <div className="image-container">
                                    <span className="image-label after">After</span>
                                    <img src={`http://localhost:5000${post.afterImage}`} alt="After" />
                                </div>
                            </div>
                            <p className="kaizen-description">{post.description}</p>
                            <button className="delete-btn" onClick={() => handleDelete(post._id)}>🗑️ Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No Kaizen posts available.</p>
                )}
            </div>
        </div>
    );
};

export default Kaizen;
