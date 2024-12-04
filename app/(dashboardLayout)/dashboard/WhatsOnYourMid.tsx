"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query"; // Importing hooks from react-query
import { Image, Calendar, FileText } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns"; // Importing date-fns functions

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
  sendButton: {
    padding: "8px 16px",
    backgroundColor: "#1565D8",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
  bottomRow: {
    display: "flex",
    gap: "28px",
    flexWrap: "wrap",
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
  const queryClient = useQueryClient();

  const { mutate, isLoading: isPosting } = useMutation(
    async (newPost: {
      title: string;
      postTime: string;
      profilePhoto: string;
      userName: string;
      description: string;
      postPhoto: string;
      likes: number;
      comments: number;
      shares: number;
    }) => {
      const response = await fetch("http://localhost:3000/postData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postData"]); // Refresh posts
     
        setInput("");
      },
    }
  );

  // Handle button click to send data
  const handleSend = () => {
    if (input.trim() !== "") {
      const currentTime = new Date().toISOString(); // Get current time in ISO format
      mutate({
        title: input,
        postTime: currentTime,
        profilePhoto: "/images/profile.png",
        userName: "test",
        description: "",
        postPhoto: "",
        likes: 0,
        comments: 0,
        shares: 0,
      });
      setInput(""); // Clear the input after sending
    }
  };

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
        <button
          style={styles.sendButton}
          onClick={handleSend}
          disabled={isPosting}
        >
          {isPosting ? "Sending..." : "Send"}
        </button>
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
