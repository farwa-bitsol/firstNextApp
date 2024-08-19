import React from "react";
import { fetchUsers } from "@/services/userService";
import DeleteUser from "@/components/DeleteUser";
import { IUser } from "@/models/types";
import Pagination from "@/components/Pagination";

const Page = async () => {
  try {
    // Fetch the data using the separate API utility
    const users: IUser[] = await fetchUsers();

    return (
      <div className="py-32 px-12">
        {users?.map((user, index) => (
          <DeleteUser key={index} user={user} />
        ))}
        <Pagination />
      </div>
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return <div>Error loading users</div>;
  }
};

export default Page;
