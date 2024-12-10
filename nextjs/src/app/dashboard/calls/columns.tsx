"use client";

import { Badge } from "@/components/ui/badge";
import type { Call } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { statuses } from "./data";

export const columns: ColumnDef<Call>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          الحالة
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: Call["status"] = row.getValue("status");
      const statusLabel = statuses.find((item) => item.value === status)?.label ?? status;
      return (
        <Badge
          variant={
            status == "completed"
              ? "default"
              : status == "active"
                ? "secondary"
                : "outline"
          }
        >
          {statusLabel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "customerId",
    header: "معرف العميل",
  },
  {
    accessorKey: "updatedAt",
    header: "تم التحديث في",
    cell: ({ row }) => {
      const timeAndDate = row.original.updatedAt.toLocaleString();
      return (
        <time dateTime={row.original.updatedAt.toString()}>{timeAndDate}</time>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const call = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">فتح القائمة</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(call.id)}
            >
              نسخ معرف المكالمة{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/dashboard/calls/${call.id}`}>
              عرض تفاصيل المكالمة
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
