"use client";
import UpcomingEventsSkelton from "@/components/skeletons/UpcomingEvents";
import { useUser } from "@/Context/UserContextProvider";
import useFetchPosts from "@/hooks/useFetchPosts";
import Image from "next/image";
import { PostProps } from "@/models/types";

const UpComingEvents = () => {
  const { data: posts = [], isLoading, error } = useFetchPosts("");
  const { userImageUrl, isLoading: isUserLoading } = useUser();

  const extractDateFromDescription = (description: string): Date | null => {
    const dateMatch = description.match(/Date:\s*(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      return new Date(dateMatch[1]);
    }
    return null;
  };

  const eventPosts = posts
    ?.filter((post: PostProps) => post?.postType === "event")
    .map((event: PostProps) => ({
      ...event,
      eventDate: extractDateFromDescription(event.description || ""),
    }))
    .filter((event: PostProps & { eventDate: Date | null }) => event?.eventDate !== null)
    .sort((a: PostProps & { eventDate: Date | null }, b: PostProps & { eventDate: Date | null }) => {
      // Sort by date in ascending order
      return (a.eventDate as Date).getTime() - (b.eventDate as Date).getTime();
    });

  if (isLoading || isUserLoading) {
    return <UpcomingEventsSkelton />;
  }

  if (error || !posts) {
    return <p>Failed to load events. Please try again later.</p>;
  }

  return (
    <div className="w-full">
      <p className="font-bold text-lg ">Upcoming Events</p>
      <div className="flex flex-col">
        {eventPosts?.map((contact: PostProps & { eventDate: Date | null }, index: number) => {
          const locationMatch = contact.description?.match(/Location:\s*(.+)/i);
          const location = locationMatch ? locationMatch[1].trim() : null;
          return (
            <div
              className="flex py-4 justify-between items-center flex-wrap"
              key={`${contact?.title}-${index}`}
            >
              <div className="flex items-center">
                <Image
                  src={userImageUrl}
                  width={50}
                  height={50}
                  alt="User Profile"
                />
                <div className="flex flex-col px-2">
                  <p className="text-sm font-bold">
                    {contact?.title || "Event"}
                  </p>
                  <p className="text-sm">{location}</p>
                </div>
              </div>
              <div>
                <Image
                  src="/images/event.svg"
                  width={25}
                  height={25}
                  alt="message icon"
                />
              </div>
            </div>
          );
        })}
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

export default UpComingEvents;
