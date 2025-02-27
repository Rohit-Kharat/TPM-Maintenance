import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TPMThemeUpdate.css"; // Import styles

const TPMThemeUpdate = () => {
    const [themes, setThemes] = useState({});
    const [selectedDay, setSelectedDay] = useState("Monday");
    const [newTheme, setNewTheme] = useState("");
    const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user details

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchThemes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tpm-themes");
            const themeData = {};
            response.data.forEach(({ day, theme }) => {
                themeData[day] = theme;
            });
            setThemes(themeData);
        } catch (error) {
            console.error("Error fetching themes:", error);
        }
    };

    const handleUpdateTheme = async () => {
        if (!selectedDay || newTheme.trim() === "") {
            alert("❌ Please select a day and enter a new theme!");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:5000/update-theme",
                { day: selectedDay, theme: newTheme }
            );
    
            if (response.data.updatedTheme) {
                setThemes((prevThemes) => ({
                    ...prevThemes,
                    [selectedDay]: newTheme,
                }));
                setNewTheme("");
                alert(`✅ Theme for ${selectedDay} updated successfully!`);
            } else {
                alert("⚠️ Theme update failed. Please try again.");
            }
        } catch (error) {
            console.error("Error updating theme:", error.response?.data?.message || error.message);
            alert("⚠️ Error updating theme. Please try again.");
        }
    };
    
    return (
        <div className="update-form">
            <h3>Update TPM Maintenance Theme</h3>
            
            <label>Select Day:</label>
            <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>

            <p>Current Theme for {selectedDay}: <strong>{themes[selectedDay] || "Not Set"}</strong></p>

            <input
                type="text"
                placeholder="Enter new theme"
                value={newTheme}
                onChange={(e) => setNewTheme(e.target.value)}
            />

            <button onClick={handleUpdateTheme}>Update</button>
        </div>
    );
};

export default TPMThemeUpdate;
