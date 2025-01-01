"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ImageUpload = ({
  setImage,
  imageUrl,
  fileInputRef,
}: {
  setImage: (file: File | null) => void;
  imageUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset file input value to allow re-upload of the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImage(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => {
    setImage(null);

    // Reset file input value when deleting the image
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setMediaPreview(imageUrl);
    }
  }, [imageUrl, setImage]);

  return (
    <div className="flex items-center gap-6">
      <div className="w-28 h-28 border rounded-xl flex items-center justify-center overflow-hidden my-8">
        {mediaPreview ? (
          <Image
            src={mediaPreview}
            alt="Preview"
            width={112}
            height={112}
            className="object-cover"
          />
        ) : (
          <div className="text-gray-500"></div>
        )}
      </div>

      <div className="flex flex-col gap-3 ">
        <button className="px-4 py-2 bg-[#1565D8] text-white rounded-lg hover:bg-[#1A75E8]">
          <label htmlFor="imageInput" className="cursor-pointer">
            Change Picture
          </label>
        </button>
        <input
          type="file"
          id="imageInput"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          className={`px-4 py-2 border rounded-lg`}
          onClick={handleDeleteImage}
          disabled={!mediaPreview}
        >
          Delete Picture
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
