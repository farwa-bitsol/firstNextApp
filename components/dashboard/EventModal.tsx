"use client";

import { useState } from "react";

export const EventModal = ({
  isOpen,
  onClose,
  onEventSubmit,
  isPosting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onEventSubmit: (title: string, description: string) => void;
  isPosting: boolean;
}) => {
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    let eventDescription = "";

    if (startDate) {
      eventDescription += `Date: ${startDate}\n`;
    }
    if (startTime && endTime) {
      eventDescription += `Time: ${startTime} to ${endTime}\n`;
    } else if (startTime) {
      eventDescription += `Time: ${startTime}\n`;
    }
    if (location) {
      eventDescription += `Location: ${location}\n`;
    }
    if (description) {
      eventDescription += `Description: ${description}\n`;
    }

    onEventSubmit(eventName, eventDescription.trim());
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          width: "90%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <h3>Create an Event</h3>
        <label>
          Event Name
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
            }}
          />
        </label>
        <label>
          Start Time
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
            }}
          />
        </label>
        <label>
          End Time
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
            }}
          />
        </label>
        <label>
          Location
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              width: "100%",
            }}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              minHeight: "100px",
              width: "100%",
            }}
          />
        </label>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ccc",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            disabled={isPosting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1565D8",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isPosting ? "Adding Event..." : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};
