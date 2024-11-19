import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="hidden md:block w-1/2">
      <div className="relative h-full bg-[#1565D8E5]">
        {/*  Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/bg.jpeg"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
            sizes={"100%"}
            alt="background image"
          />
        </div>

        {/* logo */}
        <div className="absolute top-12 left-12 z-20">
          <Image src="/images/logo.svg" alt="logo" width={100} height={100} />
        </div>

        <div className="text-white flex-col flex items-start justify-center h-full p-6">
          <p>
            The passage experienced a surge in popularity during the 1960s when
            Letraset used it on their dry-transfer sheets, and again during the
            90s as desktop publishers bundled the text with their software.
          </p>
          <div className="flex">
            <p>Vincent Obi</p>
            <Image
              src="/images/check.svg"
              fill
              style={{ objectFit: "cover" }}
              sizes={"100%"}
              quality={100}
              alt="check mark"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
