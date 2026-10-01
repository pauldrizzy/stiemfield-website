// Convergence Self-Check alerts (2026-10-01).
//   POST, from the website: a completed Self-Check (anonymous scores), or a lead the
//         visitor chose to send. Each is stored ENCRYPTED with the firm's public key.
//   GET,  from the firm's server: the encrypted events newer than ?after=<key>.
// Only the firm's server holds the private key, so nothing readable is stored or served
// here and no secret lives in this public repository. The server relays each event to
// the owner's Telegram within a minute.
import crypto from "node:crypto";
import { getStore } from "../lib/netlify-blobs.cjs";

const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAsuV8ahZxDg+xkzifDrIA
WuiIiRG02HWVGfn5ekrfFgKI67yMEobUjY8GEMSGb3A5I9d6nmZk8te2lC9wc1Mx
u+rJR23nvQCcY/I5tUAim9LgSnCOISwnplcWYtse/cHYkgkvpN3Q2uQcCPavG0do
ZkYN5ZaQwHd8mWtjGhYJ/5l9At7u0J6XsANoRAQoK4TgGftRpSGppwzaLCoF3Wxc
bD4RQ7+r1t+FoNOT7CiSagtfOdSs2jyzv/T7+S8SQNNctNRhVP1n7CdOYrVXGCIb
1uia+3uKXtVs+yutGNXnNDIZCd1XpKRVBGn+QJ4VMxTH737nmu9XadZW6KZ0uhBA
adY++9hco/0cX5NhrwMRyrWsyqo89jqK6La3AmmwJ5jeTwNS1T7tXJu1+Jd9Qinb
LI3E3pD0EtmE+R6GfjtTLweF6W6A6cRmkblijSUHeEDLeAVG1MuCvPaT0IPjHhKa
6f5pCkO+TqACpTFwdp0koOKr9WtD9JJCnPlASFXucFOlAgMBAAE=
-----END PUBLIC KEY-----`;
const STORE = "selfcheck-events";
const STATUS = "selfcheck-status";
const KEEP_MS = 14 * 24 * 3600 * 1000;   // events are deleted after 14 days
const BURST = 40;                        // at most 40 events accepted per 10 minutes

const clean = (v, n) => String(v ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, n);
const score = (v) => { const n = Number(v); return Number.isInteger(n) && n >= 2 && n <= 10 ? n : null; };
const reply = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

function seal(obj) {
  const key = crypto.randomBytes(32), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(JSON.stringify(obj), "utf8"), c.final()]);
  const ek = crypto.publicEncrypt({ key: PUBLIC_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" }, key);
  return { v: 1, ek: ek.toString("base64"), iv: iv.toString("base64"), tag: c.getAuthTag().toString("base64"), ct: ct.toString("base64") };
}

export default async (req, context) => {
  const store = getStore(STORE);

  if (req.method === "GET" && new URL(req.url).searchParams.get("status")) {
    // is the firm's email sequence live? (set only by the server's signed status)
    const s = await getStore(STATUS).get("status", { type: "json" });
    return reply({ ok: true, mail: !!(s && s.mail && Date.now() - s.t < 2 * 3600 * 1000) });
  }
  if (req.method === "GET") {
    // strong consistency: the relay must see every stored event, in order, at once
    const strong = getStore({ name: STORE, consistency: "strong" });
    const after = new URL(req.url).searchParams.get("after") || "";
    const { blobs } = await strong.list();
    const keys = blobs.map((b) => b.key).filter((k) => k > after).sort().slice(0, 200);
    const events = [];
    for (const k of keys) { const v = await strong.get(k, { type: "json" }); if (v) events.push({ key: k, ...v }); }
    return reply({ ok: true, count: events.length, events });
  }
  if (req.method !== "POST") return reply({ ok: false, reason: "method not allowed" }, 405);

  let d;
  try {
    const type = req.headers.get("content-type") || "";
    d = type.includes("json") ? await req.json() : Object.fromEntries(new URLSearchParams(await req.text()));
  } catch { return reply({ ok: false, reason: "bad request" }, 400); }
  if (d["bot-field"]) return reply({ ok: true });

  if (d.type === "status") {
    // only the holder of the private key (the firm's server) can sign this
    let valid = false;
    try { valid = crypto.verify("sha256", Buffer.from(`status|${d.mail}|${d.t}`), PUBLIC_KEY, Buffer.from(String(d.sig || ""), "base64")); } catch { valid = false; }
    if (!valid || Math.abs(Date.now() - Number(d.t)) > 600000 || !["0", "1"].includes(d.mail))
      return reply({ ok: false, reason: "unauthorised" }, 403);
    await getStore(STATUS).setJSON("status", { mail: d.mail === "1", t: Number(d.t) });
    return reply({ ok: true });
  }

  const s = { S: score(d.score_strategy), T: score(d.score_technology), I: score(d.score_innovation),
              E: score(d.score_execution), M: score(d.score_management) };
  const ci = Number(d.convergence_index);
  if (Object.values(s).some((v) => v === null) || !Number.isFinite(ci) || ci < 0 || ci > 100)
    return reply({ ok: false, reason: "invalid result" }, 400);

  const ev = { type: d.type === "lead" ? "lead" : "completed", at: new Date().toISOString(), ci: Math.round(ci),
               band: clean(d.band, 20), weakest: clean(d.weakest_force, 20), gap: clean(d.gap_pattern, 60), s,
               country: clean(context && context.geo && context.geo.country && context.geo.country.name, 60) };
  if (ev.type === "lead") {
    Object.assign(ev, { name: clean(d.name, 100), email: clean(d.email, 140), organisation: clean(d.organisation, 140), role: clean(d.role, 100) });
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ev.email)) return reply({ ok: false, reason: "invalid email" }, 400);
  }
  if (d.test === "1") ev.test = true;

  // housekeeping and the burst limit, from the keys alone (each starts with its time)
  const now = Date.now();
  const { blobs } = await store.list();
  let recent = 0;
  for (const b of blobs) {
    const t = Number(b.key.split("-")[0]);
    if (now - t > KEEP_MS) await store.delete(b.key);
    else if (now - t < 600000) recent++;
  }
  if (recent >= BURST) return reply({ ok: false, reason: "busy" }, 429);

  await store.setJSON(`${String(now).padStart(15, "0")}-${crypto.randomBytes(4).toString("hex")}`, seal(ev));
  return reply({ ok: true });
};
