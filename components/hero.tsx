import { Calendar, Users } from "lucide-react";

export function Hero() {
  return (
    <div className="size-full flex flex-col gap-16 mt-10 pr-7.5">
      <div className="bg-[url(../public/coverMain.png)] bg-center bg-cover flex bg-[#A4C3B2] rounded-2xl p-5 md:p-20 flex-col md:flex-row items-center justify-between relative overflow-hidden gap-6 text-center md:text-right">
        <div className="flex flex-wrap gap-5 justify-between items-center align-middle relative w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 w-full md:w-auto">
            Irtaqi
          </h1>
          <div className="flex flex-wrap gap-5 items-center justify-around w-full md:w-auto">
            <button className="flex gap-3 bg-white text-gray-800 px-3 py-2.5 rounded-lg items-center justify-center text-sm font-medium shadow-sm w-full sm:w-auto">
              <Calendar className="w-4 h-4 ml-2" /> Register for summer course
            </button>
            <button className="flex gap-3 bg-white text-gray-800 px-3 py-2.5 rounded-lg items-center justify-center text-sm font-medium shadow-sm w-full sm:w-auto">
              <Users className="w-4 h-4 ml-2" /> Invite a Friend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
