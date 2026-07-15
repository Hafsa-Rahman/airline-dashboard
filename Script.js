document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  initSidebar();
  initClock();

  const page = document.body.dataset.page;
  if (page === "dashboard") renderDashboard();
  if (page === "tickets") initTicketsPage();
  if (page === "departures") initBoardPage("departures");
  if (page === "arrivals") initBoardPage("arrivals");
});

function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  const open = () => { sidebar.classList.add("open"); overlay.classList.add("show"); };
  const close = () => { sidebar.classList.remove("open"); overlay.classList.remove("show"); };

  openBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  overlay?.addEventListener("click", close);
}

function initClock() {
  const el = document.getElementById("liveClock");
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const date = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    el.textContent = `${date}  ·  ${time} PKT`;
  };
  tick();
  setInterval(tick, 1000);
}

function statusBadgeClass(status) {
  return "badge-" + status.toLowerCase().replace(/\s+/g, "-");
}


function renderDashboard() {
  const activityBody = document.getElementById("recentActivity");
  if (activityBody) {
    activityBody.innerHTML = RECENT_ACTIVITY.map(a => `
      <li class="flex items-start gap-3 py-3">
        <span class="icon-btn bg-blue-50" style="background:var(--blue-50); color:var(--blue-600);">
          <i data-lucide="${a.icon}" class="w-4 h-4"></i>
        </span>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-slate-700">${a.text}</p>
          <p class="text-xs mt-0.5" style="color:var(--slate-500)">${a.time}</p>
        </div>
      </li>
    `).join("");
  }

  const todayBody = document.getElementById("todayFlights");
  if (todayBody) {
    const merged = [
      ...FLIGHTS_DEPARTURES.slice(0, 4).map(f => ({ ...f, dir: "Departure", place: f.dest })),
      ...FLIGHTS_ARRIVALS.slice(0, 3).map(f => ({ ...f, dir: "Arrival", place: f.origin })),
    ];
    todayBody.innerHTML = merged.map(f => `
      <tr>
        <td class="cell-mono">${f.flight}</td>
        <td>${f.place}</td>
        <td>${f.dir}</td>
        <td class="cell-mono">${f.sched}</td>
        <td><span class="badge ${statusBadgeClass(f.status)}">${f.status}</span></td>
      </tr>
    `).join("");
  }

  if (window.lucide) lucide.createIcons();
}


let ticketState = { search: "", status: "All", page: 1, perPage: 6 };

function initTicketsPage() {
  const searchInput = document.getElementById("ticketSearch");
  const statusSelect = document.getElementById("ticketStatusFilter");
  const modal = document.getElementById("ticketModal");
  const openModalBtn = document.getElementById("newTicketBtn");
  const closeModalBtn = document.getElementById("closeTicketModal");
  const cancelModalBtn = document.getElementById("cancelTicketModal");
  const form = document.getElementById("newTicketForm");

  searchInput?.addEventListener("input", (e) => {
    ticketState.search = e.target.value.toLowerCase();
    ticketState.page = 1;
    renderTickets();
  });

  statusSelect?.addEventListener("change", (e) => {
    ticketState.status = e.target.value;
    ticketState.page = 1;
    renderTickets();
  });

  const toggleModal = (show) => modal.classList.toggle("hidden", !show);
  openModalBtn?.addEventListener("click", () => toggleModal(true));
  closeModalBtn?.addEventListener("click", () => toggleModal(false));
  cancelModalBtn?.addEventListener("click", () => toggleModal(false));

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const newId = "TK-" + Math.floor(90000 + Math.random() * 9999);
    TICKETS.unshift({
      id: newId,
      pax: document.getElementById("fPax").value || "New Passenger",
      flight: document.getElementById("fFlight").value || "AD 000",
      route: document.getElementById("fRoute").value || "LHE → ???",
      date: document.getElementById("fDate").value || "2026-07-15",
      seat: document.getElementById("fSeat").value || "—",
      cls: document.getElementById("fClass").value || "Economy",
      status: "Pending",
    });
    form.reset();
    toggleModal(false);
    ticketState.page = 1;
    renderTickets();
  });

  renderTickets();
}

function renderTickets() {
  const tbody = document.getElementById("ticketsBody");
  const pagination = document.getElementById("ticketsPagination");
  const countLabel = document.getElementById("ticketsCount");
  if (!tbody) return;

  let rows = TICKETS.filter(t => {
    const matchesSearch =
      t.pax.toLowerCase().includes(ticketState.search) ||
      t.id.toLowerCase().includes(ticketState.search) ||
      t.flight.toLowerCase().includes(ticketState.search);
    const matchesStatus = ticketState.status === "All" || t.status === ticketState.status;
    return matchesSearch && matchesStatus;
  });

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / ticketState.perPage));
  ticketState.page = Math.min(ticketState.page, totalPages);
  const start = (ticketState.page - 1) * ticketState.perPage;
  const pageRows = rows.slice(start, start + ticketState.perPage);

  tbody.innerHTML = pageRows.length ? pageRows.map(t => `
    <tr>
      <td class="cell-mono" style="color:var(--blue-600); font-weight:600;">${t.id}</td>
      <td>${t.pax}</td>
      <td class="cell-mono">${t.flight}</td>
      <td>${t.route}</td>
      <td>${t.date}</td>
      <td>${t.seat}</td>
      <td>${t.cls}</td>
      <td><span class="badge ${statusBadgeClass(t.status)}">${t.status}</span></td>
      <td>
        <div class="flex items-center gap-1">
          <button class="icon-btn" title="Edit"><i data-lucide="pencil" class="w-4 h-4"></i></button>
          <button class="icon-btn" title="Cancel ticket" onclick="cancelTicket('${t.id}')"><i data-lucide="x-circle" class="w-4 h-4"></i></button>
        </div>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="9" class="text-center py-10" style="color:var(--slate-500)">No tickets match your filters.</td></tr>`;

  if (countLabel) countLabel.textContent = `Showing ${pageRows.length ? start + 1 : 0}–${start + pageRows.length} of ${total} tickets`;

  if (pagination) {
    let btns = "";
    for (let i = 1; i <= totalPages; i++) {
      btns += `<button class="px-3 py-1.5 rounded-lg text-sm font-medium ${i === ticketState.page ? 'btn-primary' : 'btn-ghost'}" onclick="goToTicketPage(${i})">${i}</button>`;
    }
    pagination.innerHTML = btns;
  }

  if (window.lucide) lucide.createIcons();
}

function goToTicketPage(p) { ticketState.page = p; renderTickets(); }

function cancelTicket(id) {
  const t = TICKETS.find(t => t.id === id);
  if (t) t.status = "Cancelled";
  renderTickets();
}

function initBoardPage(type) {
  const searchInput = document.getElementById("boardSearch");
  const statusSelect = document.getElementById("boardStatusFilter");
  searchInput?.addEventListener("input", () => renderBoard(type));
  statusSelect?.addEventListener("change", () => renderBoard(type));
  renderBoard(type);
}

function renderBoard(type) {
  const isDep = type === "departures";
  const data = isDep ? FLIGHTS_DEPARTURES : FLIGHTS_ARRIVALS;
  const tbody = document.getElementById("boardBody");
  const search = (document.getElementById("boardSearch")?.value || "").toLowerCase();
  const status = document.getElementById("boardStatusFilter")?.value || "All";

  const rows = data.filter(f => {
    const place = isDep ? f.dest : f.origin;
    const matchesSearch = f.flight.toLowerCase().includes(search) || place.toLowerCase().includes(search);
    const matchesStatus = status === "All" || f.status === status;
    return matchesSearch && matchesStatus;
  });

  tbody.innerHTML = rows.length ? rows.map(f => `
    <tr>
      <td class="cell-mono">${f.flight}</td>
      <td>${isDep ? f.dest : f.origin}</td>
      <td class="cell-mono">${f.sched}</td>
      <td class="cell-mono">${f.est}</td>
      <td class="cell-mono">${isDep ? f.gate : f.belt}</td>
      <td><span class="badge ${statusBadgeClass(f.status)}">${f.status}</span></td>
    </tr>
  `).join("") : `<tr><td colspan="6" class="text-center py-10" style="color:#8592ab">No flights match your filters.</td></tr>`;

  if (window.lucide) lucide.createIcons();
}