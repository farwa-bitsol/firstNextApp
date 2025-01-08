"use client";

import { Calendar, FileText, File } from "lucide-react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Image from "next/image";
import { EventModal } from "@/components/dashboard/EventModal";

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
  mediaPreviewContainer: {
    position: "relative",
    marginTop: "6px",
    maxWidth: "30px",
    height: "30px",
    borderRadius: "8px",
    marginLeft: "10%",
    marginBottom: "02px",
  },
  mediaPreview: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  },
  closeButton: {
    position: "absolute",
    top: "-6px",
    right: 0,
    color: "#000",
    border: "none",
    cursor: "pointer",
  },
};

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  isPosting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (articleTitle: string, articleContent: string) => void;
  isPosting: boolean;
}) => {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");

  const clearForm = () => {
    setArticleTitle("");
    setArticleContent("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-sm flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Write an Article</h3>
        <input
          type="text"
          placeholder="Title"
          value={articleTitle}
          onChange={(e) => setArticleTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base"
        />
        <textarea
          placeholder="Content"
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-base min-h-[100px]"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
            disabled={isPosting}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(articleTitle, articleContent);
              clearForm();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            {isPosting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const WhatsOnYourMind = () => {
  const [input, setInput] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading: isPosting } = useMutation(
    async (newPost: {
      title: string;
      postTime: string;
      userName: string;
      description: string;
      profilePhoto: string;
      postMedia: File | null;
      postType: "event" | "article" | "normal";
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
      formData.append("postType", newPost.postType);

      const response = await axios.post("/api/posts", formData);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postData"]);
        setInput("");
        setMedia(null);
        setMediaPreview(null);
        setEventModalOpen(false);
        setModalOpen(false);
      },
      onError: (error) => {
        console.log("Error posting:", error);
        setEventModalOpen(false);
        setModalOpen(false);
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
        postType: "normal",
        likes: 0,
        comments: 0,
        shares: 0,
      });
    }
  };

  const handleArticleSubmit = (title: string, content: string) => {
    const currentTime = new Date().toISOString();
    mutate({
      title,
      description: content,
      postTime: currentTime,
      userName: "test",
      profilePhoto: "/images/profile.png",
      postMedia: null,
      postType: "article",
      likes: 0,
      comments: 0,
      shares: 0,
    });
  };

  const handleEventSubmit = (title: string, content: string) => {
    const currentTime = new Date().toISOString();
    mutate({
      title,
      description: content,
      postTime: currentTime,
      userName: "test",
      profilePhoto: "/images/profile.png",
      postMedia: null,
      postType: "event",
      likes: 0,
      comments: 0,
      shares: 0,
    });
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

  const handleClearMedia = () => {
    setMedia(null);
    setMediaPreview(null);
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
        <div style={styles.mediaPreviewContainer}>
          {media?.type.startsWith("image/") && (
            <>
              <Image
                src={mediaPreview}
                alt="Media Preview"
                style={styles.mediaPreview}
                width={100}
                height={100}
              />
              <button style={styles.closeButton} onClick={handleClearMedia}>
                &times;
              </button>
            </>
          )}
          {media?.type.startsWith("video/") && (
            <>
              <video
                src={mediaPreview}
                controls
                style={styles.mediaPreview}
              ></video>
              <button style={styles.closeButton} onClick={handleClearMedia}>
                &times;
              </button>
            </>
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
        <div style={styles.iconLabel} onClick={() => setEventModalOpen(true)}>
          <Calendar size={20} style={styles.icon} />
          <span>Events</span>
        </div>
        <div style={styles.iconLabel} onClick={() => setModalOpen(true)}>
          <FileText size={20} style={styles.icon} />
          <span>Articles</span>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleArticleSubmit}
        isPosting={isPosting}
      />
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onEventSubmit={handleEventSubmit}
        isPosting={isPosting}
      />
    </div>
  );
};

export default WhatsOnYourMind;
