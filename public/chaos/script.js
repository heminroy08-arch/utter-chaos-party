/* USELESS.EXE — every feature implemented incorrectly on purpose. */

const rand = (a) => a[Math.floor(Math.random() * a.length)];
const ri = (n) => Math.floor(Math.random() * n);

/* ---------- fake sound effects (WebAudio, no files) ---------- */
let ac;
function beep(freq = 300, dur = 0.12, type = "square") {
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = 0.04;
    o.connect(g).connect(ac.destination);
    o.start();
    o.frequency.linearRampToValueAtTime(freq * (Math.random() * 2 + 0.3), ac.currentTime + dur);
    g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
    o.stop(ac.currentTime + dur);
  } catch (e) {
    /* silence is also a feature */
  }
}

/* ---------- nonsense text floaters ---------- */
const NONSENSE = [
  "BLAH",
  "wow. useless.",
  "404 emotionally",
  "click registered, ignored",
  "you did nothing!",
  "beep boop",
  "undefined but confident",
  "loading forever",
  "that was illegal",
  "🤡",
  "SKILL ISSUE",
  "server says no",
];

function floater(x, y, txt) {
  const el = document.createElement("div");
  el.className = "floater";
  el.textContent = txt || rand(NONSENSE);
  el.style.left = x + "px";
  el.style.top = y + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

/* ---------- global chaos on every click ---------- */
document.addEventListener("click", (e) => {
  beep(200 + ri(900), 0.1, rand(["square", "sawtooth", "triangle"]));
  floater(e.clientX, e.clientY);
  if (Math.random() < 0.25) document.body.style.filter = `hue-rotate(${ri(360)}deg)`;
  if (Math.random() < 0.12) shapes(6);
});

/* ---------- flashing chaos mode ---------- */
const chaos = document.getElementById("chaos");

function blahStorm(n = 10) {
  for (let i = 0; i < n; i++) {
    const el = document.createElement("div");
    el.className = "blah";
    el.textContent = "BLAH ".repeat(8 + ri(10));
    el.style.top = ri(window.innerHeight - 50) + "px";
    el.style.color = `hsl(${ri(360)} 100% 60%)`;
    el.style.animationDuration = 1.5 + Math.random() * 3 + "s";
    chaos.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }
}

function shapes(n = 20) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "shape";
    s.style.left = ri(window.innerWidth) + "px";
    s.style.top = ri(window.innerHeight) + "px";
    s.style.background = `hsl(${ri(360)} 100% 55%)`;
    s.style.borderRadius = rand(["50%", "0", "50% 0 50% 0"]);
    s.style.setProperty("--dx", ri(600) - 300 + "px");
    s.style.setProperty("--dy", ri(600) - 300 + "px");
    chaos.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}

function party(ms = 4000) {
  document.body.classList.add("PARTY");
  blahStorm(16);
  shapes(30);
  let t = 0;
  const noise = setInterval(() => beep(120 + ri(1400), 0.08, "sawtooth"), 120);
  const more = setInterval(() => {
    blahStorm(4);
    shapes(8);
  }, 700);
  setTimeout(() => {
    clearInterval(noise);
    clearInterval(more);
    document.body.classList.remove("PARTY");
  }, ms);
  void t;
}

/* ---------- fake navigation ---------- */
const FAKE_PAGES = [
  "Redirecting to /home … arrived at /home/but/wrong.",
  "This page intentionally left worse.",
  "About us: we don't know either.",
  "Contact: please shout out of your window.",
  "Pricing: $0.00 for nothing, $9999 for less.",
  "Careers: we're not hiring, we're hiding.",
];

document.querySelectorAll("[data-nav]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const move = rand(["scramble", "flip", "zoom", "spin"]);
    if (move === "flip") document.documentElement.style.transform = "rotate(180deg)";
    if (move === "zoom") document.documentElement.style.transform = "scale(0.6) rotate(7deg)";
    if (move === "spin") document.documentElement.style.transform = "rotate(-13deg)";
    if (move === "scramble") scrambleHeadings();
    document.documentElement.style.transition = "transform .6s";
    setTimeout(() => (document.documentElement.style.transform = ""), 1600);
    popup(rand(["Navigation Failed Successfully", "You Have Arrived (nowhere)"]), rand(FAKE_PAGES));
    party(1500);
  });
});

function scrambleHeadings() {
  document.querySelectorAll("h1,h3").forEach((h) => {
    h.textContent = h.textContent
      .split(" ")
      .sort(() => Math.random() - 0.5)
      .join(" ");
  });
}

/* ---------- usernames -> fake DOB -> explosion ---------- */
const NAMES = [
  "@xX_ProbablyReal_Xx",
  "@definitely_a_human",
  "@admin_do_not_ban",
  "@notarobot2007",
  "@grandmaster_flop",
  "@ceo_of_nothing",
  "@user_undefined",
  "@sql_injection_susan",
];
const MONTHS = ["Janubary", "Febtober", "Marchuary", "Aprilish", "Maybe", "Junuly", "Octember"];
const usersEl = document.getElementById("users");

NAMES.forEach((n) => {
  const wrap = document.createElement("div");
  const u = document.createElement("span");
  u.className = "username";
  u.textContent = n;
  const dob = document.createElement("span");
  dob.className = "dob";
  dob.style.display = "none";
  wrap.append(u, dob);
  usersEl.appendChild(wrap);

  u.addEventListener("click", () => {
    dob.style.display = "block";
    dob.textContent = `DATE OF BIRTH: ${rand(MONTHS)} ${1 + ri(40)}, ${1200 + ri(900)} (age: ${ri(400)} months) — click me`;
    beep(900, 0.2, "triangle");
  });

  dob.addEventListener("click", (e) => {
    e.stopPropagation();
    party(6000);
    popup("BIRTHDAY DETECTED", "Blah blah blah blah blah. This information helped no one.");
  });
});

/* ---------- popups ---------- */
const POPUPS = [
  ["Access Denied", "You are not allowed to be here."],
  ["Congratulations!", "You did nothing!"],
  ["Cookie Notice", "We ate your cookies. All of them."],
  ["Update Available", "Downgrade to version -3.0?"],
  ["Warning", "Nothing is wrong. That is the problem."],
  ["Survey", "On a scale of 1 to potato, how are you?"],
  ["Security Alert", "Someone logged in as you. It was you. Suspicious."],
];

function popup(title, body) {
  const p = document.createElement("div");
  p.className = "popup";
  p.style.left = 10 + ri(Math.max(60, window.innerWidth - 300)) + "px";
  p.style.top = 60 + ri(Math.max(60, window.innerHeight - 250)) + "px";
  const [t, b] = POPUPS[ri(POPUPS.length)];
  p.innerHTML = `<h4></h4><p></p>`;
  p.querySelector("h4").textContent = title || t;
  p.querySelector("p").textContent = body || b;

  const ok = document.createElement("button");
  ok.textContent = "OK";
  const no = document.createElement("button");
  no.textContent = "Close";
  p.append(ok, no);
  document.body.appendChild(p);

  ok.addEventListener("click", () => {
    popup();
    popup();
  }); // OK spawns more
  no.addEventListener("click", () => {
    p.style.left = ri(window.innerWidth - 260) + "px";
    p.style.top = ri(window.innerHeight - 200) + "px";
    if (Math.random() < 0.35) p.remove();
  });
  beep(500, 0.15);
}

setInterval(() => Math.random() < 0.55 && popup(), 9000);
setTimeout(() => popup("Welcome!", "You are not allowed to be here."), 1800);

/* ---------- opposite buttons ---------- */
const form = document.getElementById("form");
document.querySelectorAll("[data-act]").forEach((b) => {
  b.addEventListener("click", () => {
    const act = b.dataset.act;
    if (act === "submit") {
      form.reset();
      popup("Submitted!", "Your form has been cleared instead. You're welcome.");
    } else if (act === "cancel") {
      form.name.value = rand(["Gary the Fridge", "NULL", ";DROP TABLE users;"]);
      form.email.value = ri(99999) + "@junk.invalid";
      form.msg.value = "blah ".repeat(12);
      popup("Cancelled", "So we submitted random junk on your behalf.");
    } else if (act === "save") {
      form.querySelectorAll("input,textarea").forEach((f) => (f.value = f.value.split("").reverse().join("")));
      popup("Draft Saved", "Backwards. Forever.");
    } else if (act === "scream") {
      party(5000);
    } else {
      popup();
      party(900);
    }
    beep(150 + ri(600), 0.18, "sawtooth");
  });
});

/* runaway button */
const runaway = document.querySelector(".runaway");
runaway.addEventListener("mouseenter", () => {
  runaway.style.transform = `translate(${ri(300) - 150}px, ${ri(120) - 60}px) rotate(${ri(60) - 30}deg)`;
  beep(1200, 0.06);
});
runaway.addEventListener("click", () => popup("Impossible", "You cheated. Reported to nobody."));

/* ---------- useless search ---------- */
const search = document.getElementById("search");
const searchResult = document.getElementById("searchResult");
search.addEventListener("input", () => {
  const v = search.value;
  searchResult.innerHTML = "";
  const msg = `No results found for "${v}". Try typing nothing.`;
  [...msg].forEach((ch, i) => {
    const s = document.createElement("span");
    s.className = "bouncy";
    s.textContent = ch;
    s.style.animationDelay = i * 0.04 + "s";
    s.style.color = `hsl(${(i * 17) % 360} 100% 65%)`;
    searchResult.appendChild(s);
  });
  beep(400 + v.length * 40, 0.05);
  if (v.toLowerCase().includes("blah")) party(2500);
});

/* ---------- infinite dropdowns ---------- */
const zone = document.getElementById("dropzone");
const LABELS = ["Settings", "More Settings", "Advanced", "Deeper", "Almost there", "Nope", "Sub-menu", "Final (not final)"];
function makeDetails(depth) {
  const d = document.createElement("details");
  const s = document.createElement("summary");
  s.textContent = `▸ ${rand(LABELS)} (level ${depth})`;
  d.appendChild(s);
  d.addEventListener(
    "toggle",
    () => {
      if (d.open && d.children.length < 2) {
        for (let i = 0; i < 2; i++) d.appendChild(makeDetails(depth + 1));
        beep(300 + depth * 60, 0.07);
      }
    },
    { passive: true }
  );
  return d;
}
zone.appendChild(makeDetails(1));
zone.appendChild(makeDetails(1));

/* ---------- eternal spinner ---------- */
const pct = document.getElementById("pct");
const PCTS = ["99%", "99%", "100%", "98%", "-4%", "∞%", "almost", "99%", "recalculating…"];
setInterval(() => (pct.textContent = "Loading… " + rand(PCTS)), 900);

/* ---------- sliders & select do the opposite ---------- */
document.getElementById("slider1").addEventListener("input", (e) => {
  e.target.value = 100 - e.target.value;
  beep(100 + Number(e.target.value) * 12, 0.05);
});
document.getElementById("slider2").addEventListener("input", (e) => {
  if (e.target.value > 40) party(1200);
  e.target.value = 0;
});
document.getElementById("pick").addEventListener("change", (e) => {
  e.target.selectedIndex = 0;
  popup("Option Rejected", "That option was decorative.");
});

/* ---------- footer links ---------- */
document.querySelectorAll("[data-foot]").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    if (Math.random() < 0.5)
      alert(rand(["This link leads nowhere. Congratulations.", "Page not written yet. Maybe never.", "You have been subscribed to 47 newsletters."]));
    else popup("Broken Link", "The destination has left the internet.");
  });
});

/* ---------- easter eggs ---------- */
const ART = [
  `  (\\_/)
  ( •_•)
  / >🍰  no cake for you`,
  `  ¯\\_(ツ)_/¯
  it works on my machine`,
  ` .--.
(o_o ) < blah blah blah
 |_|_|`,
  `  /\\_/\\
 ( o.o )  404 CAT NOT FOUND
  > ^ <`,
];

document.addEventListener("keydown", (e) => {
  beep(600 + ri(500), 0.05);
  if (e.key.toLowerCase() === "b") {
    blahStorm(8);
    return;
  }
  if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
  const pre = document.createElement("pre");
  pre.className = "ascii";
  pre.textContent = rand(ART);
  document.body.appendChild(pre);
  setTimeout(() => pre.remove(), 2200);
});

/* konami-ish: any 5 clicks in a row anywhere -> total meltdown */
let clicks = 0;
document.addEventListener("click", () => {
  if (++clicks % 15 === 0) {
    party(7000);
    popup("ACHIEVEMENT UNLOCKED", "You clicked 15 times and achieved nothing!");
  }
});
