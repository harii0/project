"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Notification = {
  id: string;
  message: string;
  status: "read" | "unread";
  doctorName: string;
};

export const columns: ColumnDef<Notification>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
  {
    accessorKey: "doctorName",
    header: "User Name",
  },
];
