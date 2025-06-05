"use client";

import { EventModal } from "@/components/dashboard/EventModal";
import { Calendar, FileText } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useUser } from "@/hooks/useUser";

interface PostData {
  title: string;
  postTime: string;
  profilePhoto: string;
  userName: string;
  description: string;
  postPhoto?: string;
  likes: number;
  comments: number;
  shares: number;
  postMedia?: File | null;
  postType: "normal" | "article" | "event";
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
    marginBottom: "6px",
    flexWrap: "wrap",
  },
  profileCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  const { userImageUrl, isLoading: isUserLoading } = useUser();
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
    if (input.trim() !== "") {
      const currentTime = new Date().toISOString();
      mutate({
        title: input,
        postTime: currentTime,
        userName: "test",
        description: "",
        profilePhoto: userImageUrl,
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
      profilePhoto: userImageUrl,
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
      profilePhoto: userImageUrl,
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

  if (isUserLoading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.topRow}>
        <div
          style={{
            ...styles.profileCircle,
            backgroundImage: `url(${userImageUrl})`,
          }}
        ></div>
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
      </div>
      {/* Actions */}
      <div style={styles.bottomRow}>
        <div style={styles.iconLabel} onClick={handleMediaClick}>
          <FileText size={20} style={styles.icon} />
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
