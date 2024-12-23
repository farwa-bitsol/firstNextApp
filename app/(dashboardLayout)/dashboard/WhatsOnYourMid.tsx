"use client";

import { Calendar, FileText, File } from "lucide-react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Image from "next/image";

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
    marginBottom: "6px",
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
  hiddenFileInput: {
    display: "none",
  },
  mediaPreview: {
    marginTop: "6px",
    maxWidth: "30px",
    height: "30px",
    borderRadius: "8px",
    marginLeft: "10%",
    marginBottom: "02px",
  },
};

const WhatsOnYourMind = () => {
  const [input, setInput] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isPosting } = useMutation(
    async (newPost: {
      title: string;
      postTime: string;
      userName: string;
      description: string;
      profilePhoto: string;
      postMedia: File | null;
      likes: number;
      comments: number;
      shares: number;
    }) => {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("postTime", newPost.postTime);
      formData.append("userName", newPost.userName);
      formData.append("description", newPost.description);
      formData.append("profilePhoto", newPost.profilePhoto);
      if (newPost.postMedia) {
        formData.append("postMedia", newPost.postMedia);
      }
      formData.append("likes", newPost.likes.toString());
      formData.append("comments", newPost.comments.toString());
      formData.append("shares", newPost.shares.toString());

      const response = await axios.post("/api/posts", formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postData"]);
        setInput("");
        setMedia(null);
        setMediaPreview(null);
      },
      onError: (error) => {
        console.log("Error posting:", error);
      },
    }
  );

  const handleSend = () => {
    if (input.trim() !== "" || media) {
      const currentTime = new Date().toISOString();
      mutate({
        title: input,
        postTime: currentTime,
        userName: "test",
        description: "",
        profilePhoto: "/images/profile.png",
        postMedia: media,
        likes: 0,
        comments: 0,
        shares: 0,
      });
    }
  };

  const handleMediaClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMedia(file);
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        setMediaPreview(URL.createObjectURL(file));
      } else if (fileType.startsWith("video/")) {
        setMediaPreview(URL.createObjectURL(file));
      }
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
      {mediaPreview && (
        <div>
          {media?.type.startsWith("image/") && (
            <Image
              src={mediaPreview}
              alt="Media Preview"
              style={styles.mediaPreview}
              width={30}
              height={30}
            />
          )}
          {media?.type.startsWith("video/") && (
            <video
              src={mediaPreview}
              controls
              style={styles.mediaPreview}
            ></video>
          )}
        </div>
      )}
      {/* Actions */}
      <div style={styles.bottomRow}>
        <div style={styles.iconLabel} onClick={handleMediaClick}>
          <File size={20} style={styles.icon} />
          <span>Media</span>
          <input
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            style={styles.hiddenFileInput}
            onChange={handleMediaChange}
          />
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
