"use client";

import UpcomingEventsSkelton from "@/components/skeletons/UpcomingEvents";
import useFetchAllPosts from "@/hooks/useFetchAllPosts";
import { PostProps } from "@/models/types";
import {
  faStar,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const RenderStars = () => {
  const [lockedRating, setLockedRating] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(null);
  const handleClick = (index: number) => setLockedRating(index); // Lock the rating on click

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className="self-center flex cursor-pointer"
          onMouseEnter={() => handleMouseEnter(index)} // Update hover index
          onMouseLeave={handleMouseLeave} // Clear hover state
          onClick={() => handleClick(index)} // Lock the rating on click
        >
          <FontAwesomeIcon
            icon={
              index <= (hoverIndex ?? lockedRating ?? -1) ? faStar : faStarEmpty
            } // Fill stars based on hover or locked rating
            className={
              index <= (hoverIndex ?? lockedRating ?? -1)
                ? "text-yellow-500"
                : "text-gray-300"
            }
            size="lg"
            style={{ width: "12px", height: "12px" }}
          />
        </span>
      ))}
    </div>
  );
};

const EventPlanner = () => {
  const { posts, isLoading, error } = useFetchAllPosts();

  const eventPosts = (posts as PostProps[] | undefined)
    ?.filter((post: PostProps) => post?.postType === "event")
    ?.reduce((acc: PostProps[], current: PostProps) => {
      // Check if the userName already exists in the accumulator
      if (!acc.find((event) => event.userName === current.userName)) {
        acc.push(current);
      }
      return acc;
    }, []);

  if (isLoading) {
    return <UpcomingEventsSkelton />;
  }
  if (error || !posts) {
    return <p>Failed to load event User. Please try again later.</p>;
  }

  return (
    <div className="w-full">
      <p className="font-bold text-lg">Event Planner</p>
      <div className="flex flex-col">
        {eventPosts?.map((event: PostProps, index: number) => (
          <div
            className="flex py-4 justify-between items-center flex-wrap"
            key={`${event.userName}-${index}`}
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
                <p className="text-sm font-bold">{event.userName}</p>
                <div>
                  <RenderStars />
                </div>
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
