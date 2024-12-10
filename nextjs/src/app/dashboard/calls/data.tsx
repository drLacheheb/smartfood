import { CheckCircledIcon, CircleIcon, CheckIcon } from "@radix-ui/react-icons";

import { FileUp, Mic } from "lucide-react";
// import { CircleIcon, FileUploadIcon, MicIcon, ClockIcon, CheckCircledIcon } from 'some-icon-library'; // Replace with the actual icons you're using

export const statuses = [
  {
    value: "active",
    label: "نشط",
    icon: CircleIcon, // أيقونة للحالة النشطة
  },
  {
    value: "uploading",
    label: "جارٍ التحميل",
    icon: FileUp, // أيقونة لحالة التحميل
  },
  {
    value: "transcribing",
    label: "جارٍ النسخ",
    icon: Mic, // أيقونة لحالة النسخ
  },
  {
    value: "processing",
    label: "جارٍ المعالجة",
    icon: CheckIcon, // أيقونة لحالة المعالجة
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircledIcon, // أيقونة لحالة المكتمل
  },
];
