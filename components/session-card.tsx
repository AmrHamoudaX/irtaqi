import { MoreVertical, BookOpen, Globe, Signal, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SessionCardProps {
  title: string;
  teacher: string;
  teacherImage?: string;
  category: string;
  date: string;
  time: string;
}

export function SessionCard({
  title,
  teacher,
  teacherImage,
  category,
  date,
  time,
}: SessionCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Info */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-3 items-center w-full justify-center">
          <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
            <BookOpen className="size-5" />
          </div>
          <div>
            <p className="self-center text-xs text-teal-600 font-bold uppercase tracking-tight">
              Upcoming Session
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="size-5" />
        </button>
      </div>

      {/* Teacher Info */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar className="size-12 border-2 border-white shadow-sm">
          <AvatarImage src={teacherImage} />
          <AvatarFallback className="bg-gray-100 text-gray-500">
            <User className="size-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-800">{title}</span>
          <span className="text-xs text-gray-500">{teacher}</span>
        </div>
      </div>

      {/* Tags/Details */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <BookOpen className="size-3.5 text-gray-400" />
          <span>{category}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Globe className="size-3.5 text-gray-400" />
          <span>Online</span>
        </div>
      </div>

      <hr className="border-gray-50 mb-4" />

      {/* Footer: Date & Time */}
      <div className="flex justify-between items-center text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
        <span>{date}</span>
        <span>{time}</span>
      </div>
    </div>
  );
}
