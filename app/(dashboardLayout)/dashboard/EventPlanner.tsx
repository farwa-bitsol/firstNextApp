import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const contacts = [
  { name: "username", rating: 3.0 },
  { name: "username", rating: 5.0 },
  { name: "username", rating: 2.5 },
];

const starStyle = { width: "12px", height: "12px" };

const EventPlanner = () => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        <span className="ml-2 text-sm">{rating} &nbsp;</span>

        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="inline-block">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500"
              size="lg"
              style={starStyle}
            />
          </span>
        ))}

        {halfStar && (
          <span className="inline-block">
            <FontAwesomeIcon
              icon={faStarHalfAlt}
              className="text-yellow-500"
              size="lg"
              style={starStyle}
            />
          </span>
        )}

        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="inline-block">
            <FontAwesomeIcon
              icon={faStarEmpty}
              className="text-gray-300"
              size="lg"
              style={starStyle}
            />
          </span>
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
              <Image
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
              <Image
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
