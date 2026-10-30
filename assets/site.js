(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const EMAIL = "gglias.pro@gmail.com";
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

  /* Theme */
  const themeBtn = $("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const root = document.documentElement;
      const isDark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = isDark ? "light" : "dark";
      store.set("ah-theme", root.dataset.theme);
    });
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
      lampFrame.src = `assets/desk-lamp.html?embed=1&sign=${sign}${open ? "&on=1" : ""}${pal ? "&pal=" + pal : ""}`;
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
  const CAT = { ux: "UX", copy: "Copy", build: "Build" };
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function promptCard(p) {
    return `<article class="prompt reveal" data-cat="${p.cat}">
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
    grid.innerHTML = (window.MADE || []).map((m) => `<a class="made reveal" href="${m.href}">
      <div class="made-art" aria-hidden="true">${esc(m.art)}</div>
      <h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p><span class="arrow">→</span></a>`).join("");
  });

  /* Receipt */
  const receipt = $("#receipt");
  if (receipt) {
    const eur = (n) => "€" + Math.round(n).toLocaleString("en-US");
    const linesEl = $("[data-lines]", receipt);
    const emptyEl = $("[data-empty]", receipt);
    const founding = $("[data-founding]", receipt);
    const send = $("[data-send]", receipt);
    const mailLink = $("[data-send-mail]", receipt);
    const bar = $("[data-receipt-bar]");
    let request = {};                                  // what the receipt holds, handed to the form as hidden fields
    const items = $$("[data-item]");
    const picked = new Set((store.get("ah-receipt") || "").split(",").filter(Boolean));
    founding.checked = store.get("ah-founding") === "1";

    $("[data-order]", receipt).textContent = String(Math.floor(1000 + Math.random() * 9000));
    $("[data-date]", receipt).textContent = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    function render() {
      const chosen = items.filter((el) => picked.has(el.dataset.item));
      items.forEach((el) => {
        const on = picked.has(el.dataset.item);
        el.classList.toggle("is-selected", on);
        const b = $(".add-btn", el);
        b.setAttribute("aria-pressed", on);
        b.textContent = on ? "Added ✓" : "Add to receipt";
      });

      linesEl.innerHTML = chosen.map((el) => {
        const from = el.hasAttribute("data-from") ? "from " : "";
        const unit = el.dataset.unit || "";
        return `<li><span>${esc(el.dataset.name)}</span><span>${from}${eur(+el.dataset.price)}${unit}</span>
          <button type="button" data-remove="${el.dataset.item}" aria-label="Remove ${esc(el.dataset.name)}">×</button></li>`;
      }).join("");
      emptyEl.hidden = chosen.length > 0;

      const sub = chosen.reduce((s, el) => s + +el.dataset.price, 0);
      const disc = founding.checked ? sub * 0.25 : 0;
      const anyFrom = chosen.some((el) => el.hasAttribute("data-from"));
      const monthly = chosen.some((el) => el.dataset.unit);
      $("[data-subtotal]", receipt).textContent = eur(sub);
      $("[data-discount-row]", receipt).hidden = !disc;
      $("[data-discount]", receipt).textContent = "−" + eur(disc);
      $("[data-total]", receipt).textContent = (anyFrom ? "from " : "") + eur(sub - disc);
      $("[data-total-label]", receipt).textContent = monthly ? "Total (1st month)" : "Total";

      const body = [
        "Hi Greg,",
        "",
        "I'd like to start with:",
        ...chosen.map((el) => `- ${el.dataset.name} (${el.hasAttribute("data-from") ? "from " : ""}${eur(+el.dataset.price)}${el.dataset.unit || ""})`),
        founding.checked ? "- Founding client −25% (happy to give a testimonial)" : "",
        "",
        `Estimated total: ${(anyFrom ? "from " : "") + eur(sub - disc)}`,
        "",
        "About my product:",
        "Link:",
        "What I want to improve:",
        "",
      ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
      if (mailLink) mailLink.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Request: ${chosen.map((el) => el.dataset.name).join(", ") || "After hours"}`)}&body=${encodeURIComponent(body)}`;
      // the form: a popup over the page (Tally widget); without the widget the link opens the form in a new tab
      request = {
        services: chosen.map((el) => `${el.dataset.name} (${el.hasAttribute("data-from") ? "from " : ""}${eur(+el.dataset.price)}${el.dataset.unit || ""})`).join("; "),
        total: (anyFrom ? "from " : "") + eur(sub - disc) + (monthly ? " (1st month)" : ""),
        founding: founding.checked ? "yes" : "no",
      };
      send.href = `https://tally.so/r/${send.dataset.tally}?${new URLSearchParams(request)}`;
      send.setAttribute("aria-disabled", chosen.length ? "false" : "true");
      send.classList.toggle("is-disabled", !chosen.length);

      if (bar) {
        $("[data-bar-text]", bar).textContent = `${chosen.length} item${chosen.length === 1 ? "" : "s"} · ${(anyFrom ? "from " : "") + eur(sub - disc)}`;
        bar.classList.toggle("is-visible", chosen.length > 0 && !receiptInView);
      }
      store.set("ah-receipt", [...picked].join(","));
      store.set("ah-founding", founding.checked ? "1" : "0");
    }

    let receiptInView = false;
    if ("IntersectionObserver" in window && bar) {
      new IntersectionObserver(([e]) => {
        receiptInView = e.isIntersecting;
        bar.classList.toggle("is-visible", picked.size > 0 && !receiptInView);
      }).observe(receipt);
    }

    items.forEach((el) => {
      $(".add-btn", el).addEventListener("click", () => {
        const id = el.dataset.item;
        if (picked.has(id)) picked.delete(id);
        else { picked.add(id); toast(`${el.dataset.name} added`); }
        render();
      });
    });
    linesEl.addEventListener("click", (e) => {
      const b = e.target.closest("[data-remove]");
      if (!b) return;
      picked.delete(b.dataset.remove);
      render();
    });
    founding.addEventListener("change", render);
    send.addEventListener("click", (e) => {
      if (!picked.size) { e.preventDefault(); toast("Add something from the menu first"); return; }
      if (!window.Tally || !Tally.openPopup) return;
      e.preventDefault();
      Tally.openPopup(send.dataset.tally, {
        layout: "modal",
        width: 560,
        hiddenFields: request,
        autoClose: 4000,
        onSubmit: () => toast("Request sent. I'll reply within 24h on weekdays."),
      });
    });
    if (mailLink) mailLink.addEventListener("click", (e) => {
      if (!picked.size) { e.preventDefault(); toast("Add something from the menu first"); }
    });
    render();
  }

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
