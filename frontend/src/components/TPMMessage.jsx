import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TPMMessage.css";

const DailyThemePopup = ({ reloadTrigger }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [themes, setThemes] = useState({});
  
  useEffect(() => {
    fetchThemes();
  }, [reloadTrigger]); // Re-fetch themes when updated

  const fetchThemes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tpm-themes");
      const themeData = {};
      response.data.forEach((item) => {
        themeData[item.day] = item.theme;
      });
      setThemes(themeData);
    } catch (error) {
      console.error("Error fetching themes:", error);
    }
  };

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" });
    setShowPopup(true);

    const lastShownDate = localStorage.getItem("themePopupDate");
    if (lastShownDate !== today) {
      const now = new Date();
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const targetTime = new Date(istTime);
      targetTime.setHours(9, 0, 0, 0);

      const timeUntil9AM = targetTime.getTime() - istTime.getTime();

      if (timeUntil9AM > 0) {
        setTimeout(() => {
          setShowPopup(true);
          localStorage.setItem("themePopupDate", today);
        }, timeUntil9AM);
      } else {
        setShowPopup(true);
        localStorage.setItem("themePopupDate", today);
      }
    }
  }, []);

  const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: "Asia/Kolkata" });
  const themeMessage = themes[currentDay] || "No theme assigned for today.";

  return (
    showPopup && (
      <div className="popup-container">
        <div className="popup-content">
          <h2>Today's Maintenance Theme</h2>
          <p>{themeMessage}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    )
  );
};

export default DailyThemePopup;
