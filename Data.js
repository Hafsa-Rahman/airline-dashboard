const FLIGHTS_DEPARTURES = [
  { flight: "AD 204", dest: "Dubai (DXB)",     sched: "08:15", est: "08:15", gate: "A12", status: "On Time"  },
  { flight: "AD 118", dest: "London (LHR)",    sched: "09:00", est: "09:40", gate: "B04", status: "Delayed"  },
  { flight: "AD 552", dest: "Karachi (KHI)",   sched: "09:30", est: "09:30", gate: "A03", status: "Boarding" },
  { flight: "AD 331", dest: "Istanbul (IST)",  sched: "10:05", est: "10:05", gate: "C09", status: "On Time"  },
  { flight: "AD 764", dest: "New York (JFK)",  sched: "10:45", est: "11:15", gate: "B11", status: "Delayed"  },
  { flight: "AD 090", dest: "Doha (DOH)",      sched: "11:20", est: "11:20", gate: "A07", status: "Departed" },
  { flight: "AD 415", dest: "Toronto (YYZ)",   sched: "12:00", est: "12:00", gate: "C02", status: "On Time"  },
  { flight: "AD 621", dest: "Singapore (SIN)", sched: "13:10", est: "13:25", gate: "B08", status: "Delayed"  },
  { flight: "AD 178", dest: "Jeddah (JED)",    sched: "13:45", est: "13:45", gate: "A15", status: "Cancelled"},
  { flight: "AD 803", dest: "Paris (CDG)",     sched: "14:30", est: "14:30", gate: "C06", status: "On Time"  },
];

const FLIGHTS_ARRIVALS = [
  { flight: "AD 205", origin: "Dubai (DXB)",      sched: "07:40", est: "07:40", belt: "3", status: "Landed"  },
  { flight: "AD 119", origin: "London (LHR)",     sched: "08:20", est: "08:55", belt: "5", status: "Delayed" },
  { flight: "AD 553", origin: "Karachi (KHI)",    sched: "08:50", est: "08:50", belt: "1", status: "Arrived" },
  { flight: "AD 332", origin: "Istanbul (IST)",   sched: "09:25", est: "09:25", belt: "4", status: "On Time" },
  { flight: "AD 765", origin: "New York (JFK)",   sched: "10:10", est: "10:35", belt: "6", status: "Delayed" },
  { flight: "AD 091", origin: "Doha (DOH)",       sched: "10:50", est: "10:50", belt: "2", status: "Landed"  },
  { flight: "AD 416", origin: "Toronto (YYZ)",    sched: "11:30", est: "11:30", belt: "5", status: "On Time" },
  { flight: "AD 622", origin: "Singapore (SIN)",  sched: "12:40", est: "13:00", belt: "3", status: "Delayed" },
  { flight: "AD 179", origin: "Jeddah (JED)",     sched: "13:05", est: "13:05", belt: "1", status: "Cancelled"},
  { flight: "AD 804", origin: "Paris (CDG)",      sched: "13:50", est: "13:50", belt: "4", status: "On Time" },
];

const TICKETS = [
  { id: "TK-90231", pax: "Ayesha Raza",     flight: "AD 204", route: "LHE → DXB", date: "2026-07-15", seat: "14A", cls: "Economy",  status: "Confirmed" },
  { id: "TK-90232", pax: "Bilal Ahmed",     flight: "AD 118", route: "LHE → LHR", date: "2026-07-15", seat: "02C", cls: "Business",  status: "Confirmed" },
  { id: "TK-90233", pax: "Sana Tariq",      flight: "AD 552", route: "LHE → KHI", date: "2026-07-15", seat: "22F", cls: "Economy",  status: "Checked-in" },
  { id: "TK-90234", pax: "Hassan Iqbal",    flight: "AD 331", route: "LHE → IST", date: "2026-07-15", seat: "08D", cls: "Economy+", status: "Pending" },
  { id: "TK-90235", pax: "Mahnoor Sheikh",  flight: "AD 764", route: "LHE → JFK", date: "2026-07-15", seat: "01A", cls: "Business",  status: "Confirmed" },
  { id: "TK-90236", pax: "Usman Ghani",     flight: "AD 090", route: "LHE → DOH", date: "2026-07-15", seat: "17B", cls: "Economy",  status: "Cancelled" },
  { id: "TK-90237", pax: "Fatima Noor",     flight: "AD 415", route: "LHE → YYZ", date: "2026-07-15", seat: "05C", cls: "Business",  status: "Confirmed" },
  { id: "TK-90238", pax: "Zainab Malik",    flight: "AD 621", route: "LHE → SIN", date: "2026-07-16", seat: "19E", cls: "Economy",  status: "Checked-in" },
  { id: "TK-90239", pax: "Ali Raza",        flight: "AD 178", route: "LHE → JED", date: "2026-07-16", seat: "11F", cls: "Economy",  status: "Cancelled" },
  { id: "TK-90240", pax: "Noor Fatima",     flight: "AD 803", route: "LHE → CDG", date: "2026-07-16", seat: "03B", cls: "Business",  status: "Confirmed" },
  { id: "TK-90241", pax: "Omar Farooq",     flight: "AD 204", route: "LHE → DXB", date: "2026-07-16", seat: "24C", cls: "Economy",  status: "Pending" },
  { id: "TK-90242", pax: "Hira Yousaf",     flight: "AD 552", route: "LHE → KHI", date: "2026-07-16", seat: "09A", cls: "Economy+", status: "Confirmed" },
];

const RECENT_ACTIVITY = [
  { icon: "ticket",        text: "New ticket TK-90242 booked for Hira Yousaf",   time: "2 min ago" },
  { icon: "plane-takeoff", text: "AD 552 marked as Boarding — Gate A03",         time: "8 min ago" },
  { icon: "alert-triangle",text: "AD 118 delayed by 40 minutes",                 time: "15 min ago" },
  { icon: "plane-landing", text: "AD 205 landed from Dubai — Belt 3",            time: "22 min ago" },
  { icon: "x-circle",      text: "Ticket TK-90236 cancelled by passenger",       time: "34 min ago" },
];


export const lunchMenu = [
    { item: "Vegetarian Sandwich", price: 12.00 },
    { item: "Grilled Chicken", price: 18.00 },
    { item: "Premium Pasta", price: 25.00 }
];

export const baggageConfig = {
    minWeight: 0,
    maxWeight: 30
};