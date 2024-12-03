import React from "react";
import Image from "next/image";

const contacts = [
  { name: "username", location: "Bergen, Norway" },
  { name: "username", location: "Bergen, Norway" },
  { name: "username", location: "Bergen, Norway" },
  { name: "username", location: "Bergen, Norway" },
];

const Contacts = () => {
  return (
    <div className="w-full">
      <p className="font-bold text-lg ">Contacts</p>
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
                <p className="text-sm">{contact.location}</p>
              </div>
            </div>
            <div>
              <Image
                src="/images/message.svg"
                width={30}
                height={30}
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

export default Contacts;
