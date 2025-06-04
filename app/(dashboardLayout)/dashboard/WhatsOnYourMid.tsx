"use client";

import { Calendar, FileText } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface PostData {
  title: string;
  postTime: string;
  profilePhoto: string;
  userName: string;
  description: string;
  postPhoto: string;
  likes: number;
  comments: number;
  shares: number;
}

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
    flexWrap: "wrap",
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

  const { mutate, isLoading: isPosting } = useMutation<PostData, Error, PostData>(
    async (newPost) => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create post");
      }
      
      return await response.json();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postData"]);
        setInput("");
      },
    }
  );

  const handleSend = () => {
    if (input.trim() !== "") {
      const currentTime = new Date().toISOString();
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

      <div style={styles.bottomRow}>
        <div style={styles.iconLabel}>
          <Image 
            src="/images/media-icon.png" 
            width={20} 
            height={20} 
            style={styles.icon} 
            alt="Media upload icon" 
          />
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
