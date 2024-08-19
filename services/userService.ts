"use server";

import { IUser } from "@/models/types";
import { revalidatePath } from "next/cache";

export const fetchUsers = async (
  pageNumber: number = 1,
  limit: number = 4
): Promise<IUser[]> => {
  const res = await fetch(
    `http://localhost:3000/users?_page=${pageNumber}&_limit=${limit}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: IUser[] = await res.json();
  revalidatePath("/users");
  return data;
};

export const createUser = async (user: IUser): Promise<IUser> => {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  const data: IUser = await res.json();
  revalidatePath("/users"); // refresh the user routes to fetch the latest data
  return data;
};

export const deleteUser = async (userId: string) => {
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  revalidatePath("/users");
  return response.json();
};
