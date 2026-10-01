const CONFIG = {
  contactEmail: "hello@example.com",

  // Stripe Payment Link for the $5/hr call, e.g. "https://buy.stripe.com/abc123".
  stripeCallLink: "",

  // Scheduling link shown after payment (Cal.com, Calendly, etc.).
  bookingLink: "",

  // Formspree/Tally/Getform endpoint. While empty, pitches open the visitor's email app.
  formEndpoint: "",
};

const IDEAS = [
  {
    id: "games",
    name: "Games",
    icon: "⚔",
    items: [
      { title: "Pocket Dungeon", blurb: "A tiny browser roguelike where every floor is generated from the player's birthday.", tags: ["JavaScript", "Canvas"], status: "Idea" },
      { title: "Inside-Joke Trivia", blurb: "A party trivia game built entirely from your friend group's group chat lore.", tags: ["Web", "Multiplayer"], status: "Idea" },
      { title: "Birthday Quest", blurb: "A scavenger-hunt web game that leads someone to their real-life present.", tags: ["Web", "Gift"], status: "Idea" },
      { title: "Custom Roblox Obby", blurb: "An obstacle course themed around a creator's channel, with their fans on the leaderboard.", tags: ["Roblox", "Lua"], status: "Idea" },
    ],
  },
  {
    id: "bots",
    name: "Bots",
    icon: "@",
    items: [
      { title: "Roast Bot", blurb: "A Discord bot that pulls match stats and roasts whoever lost the last game.", tags: ["Discord", "Game APIs"], status: "Idea" },
      { title: "Study Squad Bot", blurb: "Posts daily quiz questions to a study server and tracks who's keeping up.", tags: ["Discord", "Education"], status: "Idea" },
      { title: "Server Economy", blurb: "Coins, shops, and trading for a Discord community, without the pay-to-win junk.", tags: ["Discord", "Database"], status: "Idea" },
      { title: "Restock Pinger", blurb: "Watches a store page and pings you the second something comes back in stock.", tags: ["Alerts", "Scraping"], status: "Idea" },
    ],
  },
  {
    id: "apps",
    name: "Apps & sites",
    icon: "▦",
    items: [
      { title: "Club HQ", blurb: "Attendance, dues, events, and a leaderboard that makes showing up competitive.", tags: ["Web app", "Auth"], status: "Idea" },
      { title: "One-Page Portfolio", blurb: "A fast, good-looking site for an artist, athlete, or freelancer.", tags: ["Website"], status: "Idea" },
      { title: "RSVP Page", blurb: "A custom event page with RSVPs, reminders, and a live headcount.", tags: ["Web", "Email"], status: "Idea" },
      { title: "QR Menu", blurb: "A mobile menu for a food truck or café that the owner can edit from their phone.", tags: ["Web", "Small business"], status: "Idea" },
    ],
  },
  {
    id: "automations",
    name: "Automations",
    icon: "⟳",
    items: [
      { title: "Invoice Autopilot", blurb: "Turns a row in Google Sheets into a sent invoice and a payment reminder.", tags: ["Google Sheets", "Apps Script"], status: "Idea" },
      { title: "Inbox Sorter", blurb: "Files, labels, and summarizes email so you only read what matters.", tags: ["Gmail", "Scripts"], status: "Idea" },
      { title: "Homework Sync", blurb: "Pulls assignments from a class portal into your calendar with due-date alerts.", tags: ["Calendar", "Education"], status: "Idea" },
      { title: "Price Tracker", blurb: "Logs prices on anything you're watching and emails you when they drop.", tags: ["Scripts", "Email"], status: "Idea" },
    ],
  },
  {
    id: "programs",
    name: "Programs",
    icon: "</>",
    items: [
      { title: "TI-84 Chemistry Toolkit", blurb: "Python programs for the TI-84 Plus CE covering reaction types, solubility rules, ions, and molar mass.", tags: ["Python", "TI-84 CE"], status: "Built" },
      { title: "TI-84 Physics Pack", blurb: "Kinematics, forces, and energy solvers that show every step.", tags: ["Python", "TI-84 CE"], status: "Idea" },
      { title: "File Renamer", blurb: "A desktop tool that bulk-renames and organizes photos or downloads.", tags: ["Python", "Desktop"], status: "Idea" },
      { title: "Command-Line Toolkit", blurb: "Custom terminal commands that automate a developer's daily routine.", tags: ["CLI", "Scripts"], status: "Idea" },
    ],
  },
  {
    id: "ai",
    name: "AI tools",
    icon: "✺",
    items: [
      { title: "Character Chatbot", blurb: "A chatbot with a custom personality for a game, brand, or community.", tags: ["LLM", "Web"], status: "Idea" },
      { title: "Study Guide Generator", blurb: "Turns class notes into flashcards and practice tests.", tags: ["LLM", "Education"], status: "Idea" },
      { title: "Voice Memo Summarizer", blurb: "Transcribes rambling voice notes and turns them into clean to-do lists.", tags: ["Speech", "LLM"], status: "Idea" },
      { title: "Photo Sorter", blurb: "Sorts thousands of photos by who and what is in them.", tags: ["Vision", "Desktop"], status: "Idea" },
    ],
  },
  {
    id: "weird",
    name: "Weird",
    icon: "?!",
    items: [
      { title: "Mail Pinger", blurb: "A tiny sensor inside a mailbox that texts you when the mail arrives.", tags: ["ESP32", "Hardware"], status: "Idea" },
      { title: "Thirsty Plant", blurb: "A soil sensor that texts you, in the plant's voice, when it needs water.", tags: ["Hardware", "SMS"], status: "Idea" },
      { title: "Friend Countdown", blurb: "A shared countdown to the next hangout that gets more dramatic as it gets closer.", tags: ["Web", "Fun"], status: "Idea" },
      { title: "Desk Button", blurb: "One physical button that does one thing: starts a playlist, sends a text, or orders food.", tags: ["Hardware", "Automation"], status: "Idea" },
    ],
  },
];

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

function setupStripe() {
  document.querySelectorAll("[data-stripe-call]").forEach((btn) => {
    if (CONFIG.stripeCallLink) {
      btn.href = CONFIG.stripeCallLink;
      btn.target = "_blank";
      btn.rel = "noopener";
    }
  });

  const booking = document.getElementById("booking-btn");
  if (booking) {
    if (CONFIG.bookingLink) {
      booking.href = CONFIG.bookingLink;
    } else {
      booking.remove();
      document.getElementById("thanks-copy").textContent =
        "We'll email you within 24 hours to set up a time. Bring the idea, sketches, anything that helps.";
    }
  }
}

function setupContact() {
  document.querySelectorAll("[data-contact-email]").forEach((a) => {
    a.href = `mailto:${CONFIG.contactEmail}`;
    a.textContent = CONFIG.contactEmail;
  });
}

function setupIdeas() {
  const list = document.getElementById("idea-list");
  if (!list) return;

  const filters = document.getElementById("idea-filters");
  const search = document.getElementById("idea-search");
  const empty = document.getElementById("idea-empty");

  filters.innerHTML =
    `<button class="chip active" data-filter="all">All</button>` +
    IDEAS.map((c) => `<button class="chip" data-filter="${c.id}">${escapeHtml(c.name)}</button>`).join("");

  list.innerHTML = IDEAS.map(
    (c) => `
    <section class="idea-cat" id="${c.id}" data-cat="${c.id}">
      <header class="idea-cat-head">
        <span class="cat-icon">${escapeHtml(c.icon)}</span>
        <h2>${escapeHtml(c.name)}</h2>
        <span class="idea-count">${c.items.length}</span>
      </header>
      <ul class="idea-rows">
        ${c.items
          .map(
            (i) => `
          <li class="idea-row" data-text="${escapeHtml(`${i.title} ${i.blurb} ${i.tags.join(" ")}`.toLowerCase())}">
            <div class="idea-main">
              <h3>${escapeHtml(i.title)}</h3>
              <p>${escapeHtml(i.blurb)}</p>
            </div>
            <div class="idea-side">
              <div class="tags">${i.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
              <span class="status ${i.status.toLowerCase()}">${escapeHtml(i.status)}</span>
            </div>
          </li>`
          )
          .join("")}
      </ul>
    </section>`
  ).join("");

  let active = "all";

  const apply = () => {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    list.querySelectorAll(".idea-cat").forEach((cat) => {
      const catMatch = active === "all" || cat.dataset.cat === active;
      let visible = 0;
      cat.querySelectorAll(".idea-row").forEach((row) => {
        const ok = catMatch && (!q || row.dataset.text.includes(q));
        row.hidden = !ok;
        if (ok) visible++;
      });
      cat.hidden = visible === 0;
      cat.querySelector(".idea-count").textContent = visible;
      shown += visible;
    });
    empty.hidden = shown > 0;
  };

  const setActive = (id) => {
    active = IDEAS.some((c) => c.id === id) ? id : "all";
    filters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.filter === active));
    apply();
  };

  filters.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    setActive(chip.dataset.filter);
    history.replaceState(null, "", chip.dataset.filter === "all" ? "ideas.html" : `#${chip.dataset.filter}`);
  });

  search.addEventListener("input", apply);

  setActive(location.hash.slice(1));
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
    observer.observe(el);
  });
}

function setupRotator() {
  const el = document.querySelector(".rotator-word");
  if (!el) return;
  const words = ["weird idea", "game", "bot", "app", "side quest", "wild plan"];
  let i = 0;
  setInterval(() => {
    el.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.remove("out");
    }, 350);
  }, 2400);
}

function setupCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

function setupNav() {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function setupForm() {
  const form = document.getElementById("pitch-form");
  if (!form) return;
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";

    let valid = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const empty = !field.value.trim();
      field.classList.toggle("invalid", empty);
      if (empty) valid = false;
    });
    if (!valid) {
      status.textContent = "Fill in the highlighted fields.";
      status.classList.add("error");
      return;
    }

    const data = Object.fromEntries(new FormData(form));

    if (!CONFIG.formEndpoint) {
      const body = Object.entries(data)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      window.location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(
        `New pitch: ${data.type} from ${data.name}`
      )}&body=${encodeURIComponent(body)}`;
      status.textContent = "Opening your email app to send the pitch…";
      return;
    }

    status.textContent = "Sending…";
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      form.reset();
      status.textContent = "Pitch received. We'll get back to you within 48 hours.";
    } catch {
      status.textContent = `Something broke. Email us at ${CONFIG.contactEmail} instead.`;
      status.classList.add("error");
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

setupContact();
setupStripe();
setupIdeas();
setupReveal();
setupRotator();
setupCursorGlow();
setupNav();
setupForm();
