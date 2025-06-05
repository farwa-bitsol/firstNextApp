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

  const clearForm = () => {
    setEventName("");
    setStartDate("");
    setStartTime("");
    setEndTime("");
    setLocation("");
    setDescription("");
  };

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
    clearForm();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-sm flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Create an Event</h3>
        <label className="flex flex-col gap-2">
          Event Name
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base w-full"
          />
        </label>
        <label className="flex flex-col gap-2">
          Date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="flex flex-col gap-2">
          Start Time
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="flex flex-col gap-2">
          End Time
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
        <label className="flex flex-col gap-2">
          Location
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base w-full"
          />
        </label>
        <label className="flex flex-col gap-2">
          Description
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-base min-h-[100px] w-full"
          />
        </label>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
            disabled={isPosting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer"
          >
            {isPosting ? "Adding Event..." : "Add Event"}
          </button>
        </div>
      </div>
    </div>
  );
};
