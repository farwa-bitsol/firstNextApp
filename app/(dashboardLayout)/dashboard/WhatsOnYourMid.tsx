"use client";

import React, { useState } from "react";
import { Image, Calendar, FileText } from "lucide-react";

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  profileCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url("images/profile.png")`,
  },
  inputField: {
    flexGrow: 1,
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "10px 16px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#f9f9f9",
  },
  bottomRow: {
    display: "flex",
    gap: "28px",
    alignItems: "center",
    marginTop: "12px",
    marginLeft: "10%",
  },
  iconLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    cursor: "pointer",
    color: "#1565D8",
    fontWeight: "bold",
  },
  icon: {
    color: "#1565D8",
  },
};

const WhatsOnYourMind = () => {
  const [input, setInput] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <div style={styles.profileCircle}></div>
        <input
          type="text"
          placeholder="What's on your mind?"
          style={styles.inputField}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/*  actions */}
      <div style={styles.bottomRow}>
        <div style={styles.iconLabel}>
          <Image width={20} height={20} style={styles.icon} />
          <span>Media</span>
        </div>
        <div style={styles.iconLabel}>
          <Calendar size={20} style={styles.icon} />
          <span>Events</span>
        </div>
        <div style={styles.iconLabel}>
          <FileText size={20} style={styles.icon} />
          <span>Articles</span>
        </div>
      </div>
    </div>
  );
};

export default WhatsOnYourMind;
