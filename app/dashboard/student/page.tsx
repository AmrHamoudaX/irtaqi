import { LiveSessions } from "@/components/live-sessions";
import { SessionCard } from "@/components/session-card";

export default function StudentDashboard() {
  const UPCOMING_SESSIONS = [
    {
      title: "حلقة الشيخ / عبدالرحمن نوح",
      teacher: "عبدالرحمن محمد نوح",
      category: "Review of the Holy Quran",
      date: "March 26, 2026",
      time: "01:00 PM - 05:00 PM",
    },
    // Add more session objects here...
  ];
  return (
    <div className="flex flex-col gap-10">
      <LiveSessions />
      <div className="flex flex-col gap-3 mb-10">
        <h5 className="text-xl font-bold text-gray-800">Upcoming Sessions</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UPCOMING_SESSIONS.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      </div>
    </div>
  );
}
