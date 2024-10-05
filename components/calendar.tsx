"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import "react-big-calendar/lib/css/react-big-calendar.css"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
})

type Event = {
  id: number
  title: string
  start: Date
  end: Date
  completed: boolean
}

export default function CalendarComponent() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(today) // 현재 날짜로 설정

  const events: Event[] = [
    // {
    //   id: 1,
    //   title: "Complete project proposal",
    //   start: new Date(today.getFullYear(), today.getMonth(), 10),
    //   end: new Date(today.getFullYear(), today.getMonth(), 10),
    //   completed: true,
    // },
    // {
    //   id: 2,
    //   title: "Review team performance",
    //   start: new Date(today.getFullYear(), today.getMonth(), 10),
    //   end: new Date(today.getFullYear(), today.getMonth(), 10),
    //   completed: false,
    // },
    // {
    //   id: 3,
    //   title: "Submit final report",
    //   start: new Date(today.getFullYear(), today.getMonth(), 15),
    //   end: new Date(today.getFullYear(), today.getMonth(), 15),
    //   completed: false,
    // },
    // {
    //   id: 4,
    //   title: "Prepare presentation",
    //   start: new Date(today.getFullYear(), today.getMonth(), 15),
    //   end: new Date(today.getFullYear(), today.getMonth(), 15),
    //   completed: true,
    // },
    // {
    //   id: 5,
    //   title: "Attend team meeting",
    //   start: new Date(today.getFullYear(), today.getMonth(), 20),
    //   end: new Date(today.getFullYear(), today.getMonth(), 20),
    //   completed: false,
    // },
    // {
    //   id: 6,
    //   title: "Update project timeline",
    //   start: new Date(today.getFullYear(), today.getMonth(), 20),
    //   end: new Date(today.getFullYear(), today.getMonth(), 20),
    //   completed: false,
    // },
    // {
    //   id: 7,
    //   title: "Start vacation",
    //   start: new Date(today.getFullYear(), today.getMonth(), 25),
    //   end: new Date(today.getFullYear(), today.getMonth(), 25),
    //   completed: false,
    // },
    // {
    //   id: 8,
    //   title: "Set up out-of-office",
    //   start: new Date(today.getFullYear(), today.getMonth(), 25),
    //   end: new Date(today.getFullYear(), today.getMonth(), 25),
    //   completed: true,
    // },
  ]

  const EventComponent = ({ event }: { event: Event }) => (
    <div
      className={`custom-event ${event.completed ? "completed" : "incomplete"} text-xs p-1`}
    >
      <span className="status-icon">{event.completed ? "✓" : "○"}</span>
      {event.title}
    </div>
  )

  const handleNavigate = (date: Date) => {
    setCurrentDate(date)
  }

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-[#d4d4d4]">
      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto scrollbar-hide pb-28">
        <div className="bg-[#2d2d2d] rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-[#cccccc] mb-4">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
            date={currentDate}
            components={{ event: EventComponent }}
            onNavigate={handleNavigate}
            toolbar
            className="custom-calendar"
            formats={{
              dayFormat: (date: Date) =>
                format(date, "d", { locale: locales["en-US"] }),
            }}
          />
        </div>
      </div>
    </div>
  )
}
