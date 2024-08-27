"use server";

import { IUser } from "@/models/types";
import { revalidatePath } from "next/cache";

export const fetchUsers = async (
  pageNumber: number = 1,
  limit: number = 4
): Promise<IUser[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/users?_page=${pageNumber}&_limit=${limit}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data: IUser[] = await res.json();
  revalidatePath("/users");
  return data;
};

export const createUser = async (user: IUser): Promise<IUser> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/users`, {
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}/users/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  revalidatePath("/users");
  return response.json();
};
