import { Calendar } from "lucide-react";
import { PROFILE } from "./data";
import { useT } from "./i18n";

/**
 * Booking window — embeds the user's Google Calendar appointment scheduling
 * page directly so confirmed bookings land in their Google Calendar.
 */
export function BookingWindow() {
  const t = useT();
  return (
    <div className="h-full flex flex-col bg-[#FBF8EE]">
      <div className="px-5 pt-4 pb-2 flex items-center gap-3 border-b border-black/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-400 to-rose-600 grid place-items-center text-white shadow-sm shrink-0">
          <Calendar className="w-4 h-4" strokeWidth={1.8} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500">
            {t("booking.kicker")}
          </div>
          <h2 className="text-sm font-semibold text-zinc-900 leading-tight">
            {t("booking.title")} {PROFILE.name.split(" ")[0]}
          </h2>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden relative">
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Uxl15CUS1GcM3dhTkShbG9GF8sAnu3yDC-tJ2BmuihUPAcVnGjjhmisaERW2J_J-yH0VqbjJP?gv=true&hl=en"
          style={{ border: 0, marginTop: "-80px", height: "calc(100% + 80px)" }}
          width="100%"
          frameBorder="0"
          title="Book a call"
          className="block w-full"
        />
      </div>
    </div>
  );
}