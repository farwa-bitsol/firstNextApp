"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const PostCount = () => {
  const [postCount, setPostCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostCount = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPostCount(response.data?.length);
      } catch (error) {
        console.error("Error fetching post count:", error);
        setPostCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPostCount();
  }, []);
  return (
    <p className="py-6">
      Would you like to delete your account? This account contains{" "}
      {loading ? "..." : postCount || 0} posts. Deleting your account will
      remove all the content associated with it.
    </p>
  );
};

export default PostCount;
