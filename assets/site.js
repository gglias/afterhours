(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const TZ = "Europe/Athens";
  // Open Mon–Fri, 19:00–24:00 Athens time.
  const HOURS = { days: [1, 2, 3, 4, 5], from: 19, to: 24 };
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* Toast */
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), 1800);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
  }

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    await copy(btn.dataset.copy);
    const label = btn.textContent;
    btn.textContent = "Copied";
    toast("Copied to clipboard");
    setTimeout(() => (btn.textContent = label), 1400);
  });

  /* Theme: dark is home, light is the same system on paper */
  const themeBtns = $$("[data-set-theme]");
  const showTheme = () => {
    const light = document.documentElement.dataset.theme === "light";
    themeBtns.forEach((b) => b.setAttribute("aria-pressed", (b.dataset.setTheme === "light") === light));
  };
  themeBtns.forEach((b) => b.addEventListener("click", () => {
    const root = document.documentElement;
    if (b.dataset.setTheme === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    store.set("ah-theme", b.dataset.setTheme);
    showTheme();
    // the desk drawing has no paper behind it: light ink on the dark canvas, dark ink on the light one
    const f = $("[data-lamp]");
    if (f && f.contentWindow && f.getAttribute("src")) f.contentWindow.postMessage({ type: "lamp", ink: inkFor() }, location.origin);
  }));
  function inkFor() { return document.documentElement.dataset.theme === "light" ? "dark" : "light"; }
  showTheme();

  /* Availability (assets/availability.js) */
  const AVAIL = { available: "Available", limited: "Limited availability", booked: "Fully booked" };
  const av = window.AVAILABILITY || {};
  const avState = AVAIL[av.state] ? av.state : "available";
  $$("[data-availability]").forEach((el) => {
    el.dataset.state = avState;
    el.innerHTML = `<span class="avail-dot"></span><b></b><span></span>`;
    $("b", el).textContent = AVAIL[avState];
    if (av.note) $("span:last-child", el).textContent = av.note; else $("span:last-child", el).remove();
  });

  /* Selection frame: live W × H, like Figma */
  const frame = $("[data-frame]");
  if (frame) {
    const size = $("[data-frame-size]", frame);
    const measure = () => { const r = frame.getBoundingClientRect(); size.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`; };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(frame);
  }

  /* Header border on scroll */
  const header = $(".site-header");
  const onScroll = () => header && header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Open / Closed, Athens time */
  function athensNow() {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: TZ, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    return { day: DAYS.indexOf(get("weekday")), h: +get("hour"), m: +get("minute") };
  }
  function nextOpening(now) {
    for (let i = 0; i < 8; i++) {
      const d = (now.day + i) % 7;
      if (!HOURS.days.includes(d)) continue;
      if (i === 0 && now.h >= HOURS.from) continue;
      if (i === 0) return `today at ${HOURS.from}:00`;
      if (i === 1) return `tomorrow at ${HOURS.from}:00`;
      return `${DAYS[d]} at ${HOURS.from}:00`;
    }
    return "soon";
  }
  /* The desk drawing in the hero: lamp on and screen "OPEN" during studio hours. The visitor can also play with
     the light (the switch on the lamp base, or the button under the drawing). */
  const lampFrame = $("[data-lamp]");
  const lampBtn = $("[data-lamp-toggle]");
  let lampOn = false, lastOpen = null;
  function setLampBtn(on) {
    lampOn = on;
    if (!lampBtn) return;
    lampBtn.setAttribute("aria-pressed", on);
    lampBtn.textContent = on ? "Lights off" : "Lights on";
  }
  function driveLamp(open) {
    if (!lampFrame) return;
    const sign = open ? "open" : "closed";
    if (!lampFrame.getAttribute("src")) {
      const pal = getComputedStyle(document.documentElement).getPropertyValue("--lamp-pal").trim();
      lampFrame.src = `assets/desk-lamp.html?embed=1&sign=${sign}${open ? "&on=1" : ""}${pal ? "&pal=" + pal : ""}&ink=${inkFor()}&yaw=36&pitch=30`;   // starting view: a little more from the front
      setLampBtn(open);
    } else if (open !== lastOpen) {
      lampFrame.contentWindow.postMessage({ type: "lamp", on: open, sign }, location.origin);
      setLampBtn(open);
    }
    lastOpen = open;
  }
  addEventListener("message", (e) => {
    if (e.origin === location.origin && e.data && e.data.type === "lamp-toggled") setLampBtn(!!e.data.on);
  });
  if (lampBtn) {
    lampBtn.addEventListener("click", () => {
      if (!lampFrame || !lampFrame.contentWindow) return;
      lampFrame.contentWindow.postMessage({ type: "lamp", on: !lampOn }, location.origin);
    });
  }

  function updateStatus() {
    const now = athensNow();
    const open = HOURS.days.includes(now.day) && now.h >= HOURS.from && now.h < HOURS.to;
    driveLamp(open);
    const clock = `${String(now.h).padStart(2, "0")}:${String(now.m).padStart(2, "0")}`;
    $$("[data-status]").forEach((el) => (el.dataset.open = open));
    $$("[data-status-text]").forEach((el) => {
      el.innerHTML = open
        ? `Open now <span class="status-text-long">· ${clock} Athens</span>`
        : `Closed <span class="status-text-long">· ${clock} Athens</span>`;
    });
    const sign = $("[data-sign]");
    if (sign) {
      sign.dataset.open = open;
      $("[data-clock]", sign).textContent = `${clock} Athens`;
      $("[data-sign-word]", sign).textContent = open ? "Open" : "Closed";
      $("[data-sign-note]", sign).textContent = open
        ? "I'm at the desk. Send your request now."
        : `Back ${nextOpening(now)}. Leave a note, I'll reply then.`;
    }
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* Prompts */
  const CAT = { ux: "UX", copy: "Copy", build: "Build", research: "Research" };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function promptCard(p) {
    return `<article class="prompt surface reveal" data-cat="${p.cat}">
      <div class="prompt-head"><span class="tag">${CAT[p.cat] || p.cat}</span><span class="tiny">${p.text.length} chars</span></div>
      <h3>${esc(p.title)}</h3>
      <p class="prompt-desc">${esc(p.desc)}</p>
      <pre>${esc(p.text)}</pre>
      <div class="prompt-foot"><span class="tiny">Paste into Claude</span><button class="btn btn-sm" type="button" data-copy="${esc(p.text)}">Copy prompt</button></div>
    </article>`;
  }
  $$("[data-prompts]").forEach((grid) => {
    const list = window.PROMPTS || [];
    const limit = +grid.dataset.limit || list.length;
    grid.innerHTML = list.slice(0, limit).map(promptCard).join("");
  });
  $$("[data-tabs]").forEach((tabs) => {
    const grid = $("[data-prompts]");
    tabs.addEventListener("click", (e) => {
      const tab = e.target.closest("[data-filter]");
      if (!tab) return;
      $$("[data-filter]", tabs).forEach((t) => t.setAttribute("aria-selected", t === tab));
      $$(".prompt", grid).forEach((card) => {
        card.hidden = tab.dataset.filter !== "all" && card.dataset.cat !== tab.dataset.filter;
      });
    });
  });
  $$("[data-made]").forEach((grid) => {
    grid.innerHTML = (window.MADE || []).map((m) => `<a class="made surface reveal" href="${m.href}"${/^https?:/.test(m.href) ? ' target="_blank" rel="noopener"' : ""}>
      <div class="made-art" aria-hidden="true">${esc(m.art)}</div>
      <h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p><span class="arrow">→</span></a>`).join("");
  });

  /* Reveal on scroll */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  const year = $("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
