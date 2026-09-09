// Netlify event-triggered function: fires after a Netlify Forms submission is
// stored. This is the SECONDARY path — it only runs if form detection is enabled
// for the site. The primary path is the HTTP endpoint in lead.js, which the page
// posts to directly and which needs no Netlify Forms configuration.
//
// Both paths share exactly the same email logic (sendLeadEmails), so a lead is
// answered identically whichever route delivers it.

const { sendLeadEmails } = require("./lead.js");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || {};
    const data = payload.data || {};

    const formName = payload.form_name || data["form-name"];
    if (formName && formName !== "convergence-selfcheck") {
      return { statusCode: 200, body: "ignored (other form)" };
    }

    if (!data.email && payload.email) data.email = payload.email;

    const result = await sendLeadEmails(data);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.error("submission-created error:", err && err.message);
    // Return 200 so a mail failure never blocks Netlify's form pipeline.
    return { statusCode: 200, body: "error handled" };
  }
};
