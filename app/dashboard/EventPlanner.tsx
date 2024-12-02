import React from "react";
import { Star } from "lucide-react";

const contacts = [
  { name: "username", rating: 3.0 },
  { name: "username", rating: 5.0 },
  { name: "username", rating: 2.5 },
];

const EventPlanner = () => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        <span className="ml-2 text-sm">{rating} &nbsp;</span>
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} className="text-yellow-500" size={15} />
        ))}

        {halfStar && (
          <div className="relative">
            <Star className="text-gray-300 absolute top-0 left-0" size={15} />
            <Star
              className="text-yellow-500 absolute top-0 left-0"
              size={15}
              style={{ width: "50%", overflow: "hidden" }}
            />
          </div>
        )}

        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} className="text-gray-300" size={15} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <p className="font-bold text-lg">Event Planner</p>
      <div className="flex flex-col">
        {contacts.map((contact, index) => (
          <div
            className="flex py-4 justify-between items-center flex-wrap"
            key={`${contact.name}-${index}`}
          >
            <div className="flex items-center">
              <img
                src="/images/profile.png"
                width={50}
                height={50}
                alt="User Profile"
                className="rounded-full"
              />
              <div className="flex flex-col px-2">
                <p className="text-sm font-bold">{contact.name}</p>
                <div>{renderStars(contact.rating)}</div>
              </div>
            </div>
            <div>
              <img
                src="/images/phone.svg"
                width={20}
                height={20}
                alt="message icon"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="bg-[#1565D8] text-white px-6 py-3 rounded-xl"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default EventPlanner;
