// HTTP endpoint: POST /.netlify/functions/lead
//
// This is the PRIMARY path for Convergence Self-Check leads. It does not depend
// on Netlify Forms being enabled — the page posts here directly, so the only
// setup required is the RESEND_API_KEY environment variable.
//
// It also exports sendLeadEmails() so the Netlify Forms event function
// (submission-created.js) can reuse exactly the same logic if Forms is enabled.
//
// SETUP (Netlify → Site configuration → Environment variables):
//   RESEND_API_KEY  required — https://resend.com (free tier). Until it is set,
//                   this endpoint reports notConfigured and sends nothing.
//   FROM_EMAIL      optional — e.g. "Stiemfield <hello@stiemfield.com>". Must be
//                   on a domain verified in Resend. Defaults to Resend's
//                   onboarding sender, which can only mail your own address.
//   NOTIFY_EMAIL    optional — internal lead alert recipient.
//   BOOKING_URL / REPLY_TO  optional.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const esc = (s) =>
  String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function bandFor(ci) {
  const n = parseInt(ci, 10);
  if (isNaN(n)) return { label: "", color: "#D9A511" };
  if (n < 40) return { label: "Fragile", color: "#B23A2E" };
  if (n < 60) return { label: "Exposed", color: "#C77D0A" };
  if (n < 80) return { label: "Converging", color: "#B8901B" };
  return { label: "Aligned", color: "#2E7D4F" };
}

async function sendEmail(apiKey, msg) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Resend ${res.status}: ${text}`);
  return text;
}

function leadEmailHtml({ name, ci, weakest, gap, booking }) {
  const band = bandFor(ci);
  const hello = name ? `Hi ${esc(String(name).split(" ")[0])},` : "Hi there,";
  const ciBlock = ci
    ? `<tr><td style="padding:22px 30px 6px">
         <div style="font-family:Georgia,serif;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8b96a3">Your Convergence Index</div>
         <div style="font-family:Georgia,serif"><span style="font-size:44px;font-weight:bold;color:#0B1B2B">${esc(ci)}</span><span style="color:#5B6672;font-size:15px"> / 100</span>
         ${band.label ? `&nbsp;<span style="display:inline-block;background:${band.color};color:#fff;font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;padding:3px 12px;vertical-align:middle">${band.label}</span>` : ""}</div>
       </td></tr>`
    : "";
  const weakBlock = weakest
    ? `<tr><td style="padding:6px 30px"><p style="margin:0;font-family:Georgia,serif;color:#0B1B2B;font-size:15px"><b>Weakest force:</b> ${esc(weakest)}</p></td></tr>`
    : "";
  const gapBlock = gap
    ? `<tr><td style="padding:2px 30px 8px"><p style="margin:0;font-family:Georgia,serif;color:#0B1B2B;font-size:15px"><b>Gap pattern:</b> ${esc(gap)}</p></td></tr>`
    : "";
  return `<!DOCTYPE html><html><body style="margin:0;background:#FAF8F3;padding:0">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F3;padding:24px 0">
   <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border:1px solid #E4D9BE">
     <tr><td style="background:#0B1B2B;padding:22px 30px">
        <span style="font-family:Georgia,serif;color:#fff;font-size:18px;letter-spacing:2px;font-weight:bold">STIEMFIELD</span>
        <span style="font-family:Georgia,serif;color:#D9A511;font-size:12px;letter-spacing:2px"> · GLOBAL CONVERGENCE</span>
     </td></tr>
     <tr><td style="padding:28px 30px 6px">
        <p style="margin:0 0 14px;font-family:Georgia,serif;font-size:16px;color:#0B1B2B">${hello}</p>
        <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.65;color:#0B1B2B">Thank you for completing the Convergence Self-Check. Your responses are with me, and here is your snapshot to keep.</p>
     </td></tr>
     ${ciBlock}${weakBlock}${gapBlock}
     <tr><td style="padding:12px 30px 4px">
        <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.65;color:#0B1B2B">In our work the score matters less than the connection: a strong force that stands alone produces nothing. Within one working day I'll send you a short, personal read on your weakest force — no obligation.</p>
     </td></tr>
     <tr><td style="padding:20px 30px 8px">
        <a href="${esc(booking)}" style="display:inline-block;background:#D9A511;color:#0B1B2B;font-family:Georgia,serif;font-weight:bold;font-size:15px;text-decoration:none;padding:13px 28px">Book a scoping call →</a>
     </td></tr>
     <tr><td style="padding:16px 30px 26px">
        <p style="margin:0;font-family:Georgia,serif;font-size:14px;color:#5B6672">— Terungwa Paul Asar<br>Convergence Consultant &amp; Founding Partner, Stiemfield Global Convergence Ltd<br><a href="https://stiemfield.com" style="color:#9a7a12">stiemfield.com</a> · <a href="https://stiemfield.com/os/" style="color:#9a7a12">STIEM OS</a></p>
     </td></tr>
     <tr><td style="background:#F2ECDF;padding:14px 30px;border-top:2px solid #D9A511">
        <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#8b96a3">You received this because you completed the Self-Check at stiemfield.com. We sell diagnosis, architecture and engineering — never investment advice.</p>
     </td></tr>
    </table>
   </td></tr>
  </table></body></html>`;
}

function internalEmailHtml(d) {
  const rows = Object.entries(d)
    .map(([k, v]) => `<tr><td style="padding:3px 10px;border:1px solid #E4D9BE;font-weight:bold">${esc(k)}</td><td style="padding:3px 10px;border:1px solid #E4D9BE">${esc(v)}</td></tr>`)
    .join("");
  return `<div style="font-family:Georgia,serif;color:#0B1B2B">
    <h2 style="margin:0 0 10px">New Convergence Self-Check lead</h2>
    <table style="border-collapse:collapse;font-size:14px">${rows}</table>
    <p style="margin-top:14px"><a href="https://calendly.com/asarpaul8/30min">Send scoping-call link</a></p>
  </div>`;
}

// ---- No-API-key fallback: FormSubmit.co -------------------------------------
// Sends the lead to the owner AND an autoresponse to the person who took the
// Self-Check, with no API key and no account. Trade-off: the autoresponse is
// plain text, not branded HTML. Requires ONE activation click the first time
// (FormSubmit emails OWNER_EMAIL a confirmation link on the first submission).
const OWNER_EMAIL_DEFAULT = "asarpaul8@gmail.com";

function autoresponseText({ name, ci, band, weakest, gap, booking }) {
  const lines = [];
  lines.push(name ? `Hi ${String(name).split(" ")[0]},` : "Hi there,");
  lines.push("");
  lines.push("Thank you for completing the Convergence Self-Check. Here is your snapshot to keep.");
  lines.push("");
  if (ci) lines.push(`Convergence Index: ${ci}/100${band ? ` (${band})` : ""}`);
  if (weakest) lines.push(`Weakest force: ${weakest}`);
  if (gap) lines.push(`Gap pattern: ${gap}`);
  lines.push("");
  lines.push("In our work the score matters less than the connection: a strong force that stands alone produces nothing. Within one working day I'll send you a short, personal read on your weakest force - no obligation.");
  lines.push("");
  lines.push(`Book a scoping call: ${booking}`);
  lines.push("");
  lines.push("- Terungwa Paul Asar");
  lines.push("Convergence Consultant & Founding Partner");
  lines.push("Stiemfield Global Convergence Ltd | https://stiemfield.com");
  return lines.join("\n");
}

async function sendViaFormSubmit(data, { ci, band, weakest, gap, booking, owner }) {
  const payload = {
    _subject: `New Convergence lead: ${data.name || data.email}${ci ? ` - CI ${ci}` : ""}`,
    _template: "table",
    _captcha: "false",
    _autoresponse: autoresponseText({ name: data.name, ci, band, weakest, gap, booking }),
    name: data.name || "",
    email: String(data.email || "").trim(), // FormSubmit replies to this address
    organisation: data.organisation || "",
    role: data.role || "",
    convergence_index: ci || "",
    weakest_force: weakest || "",
    gap_pattern: gap || "",
    score_strategy: data.score_strategy || "",
    score_technology: data.score_technology || "",
    score_innovation: data.score_innovation || "",
    score_execution: data.score_execution || "",
    score_management: data.score_management || "",
  };
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(owner)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`FormSubmit ${res.status}: ${text}`);
  return text;
}

// Shared by this endpoint and the Netlify Forms event function.
async function sendLeadEmails(data) {
  const to = String(data.email || "").trim();
  if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) {
    return { ok: false, reason: "invalid email" };
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No key configured -> use the keyless path so auto-mailing still works.
    const owner = process.env.NOTIFY_EMAIL || process.env.OWNER_EMAIL || OWNER_EMAIL_DEFAULT;
    const ci = data.convergence_index;
    try {
      const raw = await sendViaFormSubmit(data, {
        ci,
        band: bandFor(ci).label,
        weakest: data.weakest_force,
        gap: data.gap_pattern,
        booking: process.env.BOOKING_URL || "https://calendly.com/asarpaul8/30min",
        owner,
      });
      return { ok: true, via: "formsubmit", sent: to, owner, note: "plain-text autoresponse; no API key used", raw: raw.slice(0, 300) };
    } catch (err) {
      return { ok: false, via: "formsubmit", error: String(err && err.message) };
    }
  }
  const from = process.env.FROM_EMAIL || "Stiemfield Global Convergence <onboarding@resend.dev>";
  const booking = process.env.BOOKING_URL || "https://calendly.com/asarpaul8/30min";
  const replyTo = process.env.REPLY_TO || "terungwa@stiemfield.com";

  const ci = data.convergence_index, weakest = data.weakest_force, gap = data.gap_pattern;

  await sendEmail(apiKey, {
    from, to: [to], reply_to: replyTo,
    subject: "Your Convergence Self-Check result — Stiemfield",
    html: leadEmailHtml({ name: data.name, ci, weakest, gap, booking }),
  });

  const notify = process.env.NOTIFY_EMAIL;
  if (notify) {
    await sendEmail(apiKey, {
      from, to: [notify], reply_to: to,
      subject: `New lead: ${data.name || to}${ci ? ` — CI ${ci}` : ""}`,
      html: internalEmailHtml({
        Name: data.name || "", Email: to, Organisation: data.organisation || "",
        Role: data.role || "", "Convergence Index": ci || "",
        "Weakest force": weakest || "", "Gap pattern": gap || "",
        Strategy: data.score_strategy || "", Technology: data.score_technology || "",
        Innovation: data.score_innovation || "", Execution: data.score_execution || "",
        Management: data.score_management || "",
      }),
    });
  }
  return { ok: true, via: "resend", sent: to, internalAlert: Boolean(notify) };
}

function parseBody(event) {
  const raw = event.body || "";
  const ct = (event.headers &&
    (event.headers["content-type"] || event.headers["Content-Type"])) || "";
  if (ct.includes("application/json")) {
    try { return JSON.parse(raw); } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    // Health check — lets us confirm the function is deployed and whether the key is set.
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true, endpoint: "lead",
        mode: process.env.RESEND_API_KEY ? "resend (branded HTML)" : "formsubmit (keyless, plain text)",
        resendConfigured: Boolean(process.env.RESEND_API_KEY),
        fromConfigured: Boolean(process.env.FROM_EMAIL),
        notifyConfigured: Boolean(process.env.NOTIFY_EMAIL),
        ownerEmail: process.env.NOTIFY_EMAIL || process.env.OWNER_EMAIL || OWNER_EMAIL_DEFAULT,
      }),
    };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const data = parseBody(event);
    if (data["bot-field"]) return { statusCode: 200, body: JSON.stringify({ ok: true, spam: true }) };
    const result = await sendLeadEmails(data);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("lead error:", err && err.message);
    // Never fail the visitor's experience over a mail problem.
    return { statusCode: 200, body: JSON.stringify({ ok: false, error: String(err && err.message) }) };
  }
};

exports.sendLeadEmails = sendLeadEmails;
