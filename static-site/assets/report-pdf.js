/* Convergence Self-Check: the branded PDF report (2026-10-01).
   Built in the visitor's browser with jsPDF and downloaded directly; nothing is uploaded.
   window.sgcReportPdf(jsPDF, report, {NAMES, DESC, MOVES, card}) saves the file;
   sgcReportPdfBuild(...) returns the document (used for testing). */
(function (root) {
  "use strict";
  var NAVY = [11, 27, 43], GOLD = [217, 165, 17], GOLD_INK = [143, 103, 11], GOLD_LT = [232, 198, 112],
      GREY = [91, 102, 114], INK = [38, 50, 63], TRACK = [238, 233, 221], PAPER = [250, 248, 243], LINE = [228, 217, 190];
  var ORDER = ["S", "T", "I", "E", "M"];

  // the standard PDF fonts cannot draw these characters
  function clean(t) {
    return String(t == null ? "" : t)
      .replace(/[—–]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
      .replace(/₦/g, "NGN ").replace(/…/g, "...").replace(/→/g, "->");
  }
  function rgb(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
    if (!m) return NAVY;
    var n = parseInt(m[1], 16);
    return [n >> 16, (n >> 8) & 255, n & 255];
  }

  function build(jsPDF, r, T, logo, when) {
    var doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
    var W = 210, H = 297, M = 18, C = W / 2, y = 0;
    doc.setProperties({ title: "Convergence Self-Check report", subject: "Stiemfield Global Convergence",
      author: "Stiemfield Global Convergence Limited", creator: "stiemfield.com" });

    function font(face, style, size, colour) { doc.setFont(face, style); doc.setFontSize(size); doc.setTextColor(colour[0], colour[1], colour[2]); }
    function spaced(text, yy, size, colour, gap) {          // centred small capitals with letter-spacing
      text = clean(text).toUpperCase(); gap = gap == null ? 0.9 : gap;
      font("helvetica", "bold", size, colour);
      var w = doc.getTextWidth(text) + gap * (text.length - 1);
      doc.text(text, C - w / 2, yy, { charSpace: gap });
    }
    function lines(text, width, size) { doc.setFontSize(size); return doc.splitTextToSize(clean(text), width); }
    function centred(arr, x, yy, lh) { arr.forEach(function (ln, i) { doc.text(ln, x, yy + i * lh, { align: "center" }); }); return yy + arr.length * lh; }

    // ---- header band: the logo, centred
    doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]); doc.rect(0, 0, W, 32, "F");
    if (logo) doc.addImage(logo, "PNG", C - 39, 6, 78, 15.6);
    spaced("Convergence Self-Check report  ·  " + when, 27.6, 6.8, GOLD_LT, 0.7);
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]); doc.rect(0, 32, W, 1.1, "F");

    // ---- the Index
    y = 43; spaced("Your Convergence Index", y, 7.5, GOLD_INK);
    y = 59; font("times", "bold", 42, NAVY);
    var num = String(r.ci), nw = doc.getTextWidth(num);
    doc.text(num, C - 4, y, { align: "center" });
    font("times", "normal", 12, GREY); doc.text("/100", C - 4 + nw / 2 + 1, y);
    var band = clean(r.band).toUpperCase(); font("helvetica", "bold", 7.8, [255, 255, 255]);
    var bw = doc.getTextWidth(band) + 0.8 * (band.length - 1) + 12, bc = rgb(r.color);
    doc.setFillColor(bc[0], bc[1], bc[2]); doc.roundedRect(C - bw / 2, 63.5, bw, 7, 1, 1, "F");
    doc.text(band, C - (bw - 12) / 2, 68.2, { charSpace: 0.8 });
    font("helvetica", "normal", 9.3, GREY);
    y = centred(lines(r.txt, 150, 9.3), C, 77.5, 4.3);

    // ---- the five forces
    y += 5; spaced("The five forces", y, 7.5, GOLD_INK); y += 6.5;
    ORDER.forEach(function (f) {
      var v = r.s[f], weak = f === r.low;
      font("times", "bold", 10.5, NAVY); doc.text(T.NAMES[f], M, y);
      font("helvetica", "bold", 8.6, weak ? GOLD_INK : GREY); doc.text(v + "/10" + (weak ? "  ·  weakest" : ""), W - M, y, { align: "right" });
      doc.setFillColor(TRACK[0], TRACK[1], TRACK[2]); doc.rect(M, y + 1.8, W - 2 * M, 3, "F");
      var fill = weak ? GOLD : NAVY; doc.setFillColor(fill[0], fill[1], fill[2]); doc.rect(M, y + 1.8, (W - 2 * M) * v / 10, 3, "F");
      y += 9.6;
    });

    // ---- weakest force and gap pattern, side by side
    y += 1;
    var bxw = (W - 2 * M - 8) / 2, pad = 6;
    var leftT = clean(T.NAMES[r.low] + " - " + r.s[r.low] + "/10"), rightT = clean(r.gap[0]);
    var leftD = lines(T.DESC[r.low], bxw - 2 * pad, 8.6), rightD = lines(r.gap[1], bxw - 2 * pad, 8.6);
    var leftH = lines(leftT, bxw - 2 * pad, 11.5), rightH = lines(rightT, bxw - 2 * pad, 11.5);
    var bh = 2 * pad + 6 + Math.max(leftH.length * 5 + leftD.length * 3.9, rightH.length * 5 + rightD.length * 3.9) + 2;
    [[M, "Your weakest force", leftH, leftD], [M + bxw + 8, "Your gap pattern", rightH, rightD]].forEach(function (b) {
      var x = b[0], cx = x + bxw / 2;
      doc.setDrawColor(LINE[0], LINE[1], LINE[2]); doc.setLineWidth(0.3); doc.setFillColor(255, 255, 255); doc.rect(x, y, bxw, bh, "FD");
      doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]); doc.rect(x, y, bxw, 0.9, "F");
      var t = clean(b[1]).toUpperCase(); font("helvetica", "bold", 7, GOLD_INK);
      var tw = doc.getTextWidth(t) + 0.7 * (t.length - 1); doc.text(t, cx - tw / 2, y + pad + 2, { charSpace: 0.7 });
      font("times", "bold", 11.5, NAVY); var yy = centred(b[2], cx, y + pad + 9, 5);
      font("helvetica", "normal", 8.6, GREY); centred(b[3], cx, yy + 1, 3.9);
    });
    y += bh + 7.5;

    // ---- three priority moves
    spaced("Three priority moves", y, 7.5, GOLD_INK); y += 6.5;
    T.MOVES[r.low].forEach(function (mv, i) {
      font("helvetica", "normal", 9.2, INK);
      y = centred(lines((i + 1) + ".  " + mv, 160, 9.2), C, y, 4.3) + 1.6;
    });

    // ---- the honest caveat, the next step and how to book it, in one panel
    y += 2.5;
    var note = lines("The same arithmetic as our diagnostics, at lower resolution: honest about the direction of a problem, not its exact size. A STIEM Snapshot tests each force and its connection to the other four, with evidence.", 156, 8.4);
    var price = T.card === "usd" ? "USD 1,950" : "NGN 250,000";
    var next = lines("Next step: a STIEM Snapshot - two weeks, " + price + ", credited toward a Fieldscan if commissioned within 90 days.", 156, 9.8);
    var nh = 7.5 + 3.5 + note.length * 3.7 + 2.5 + next.length * 4.5 + 3 + 9.5;
    if (y + nh > H - 21) { doc.addPage(); y = 24; }      // safety net; the layout is sized for one page
    doc.setFillColor(PAPER[0], PAPER[1], PAPER[2]); doc.rect(M, y, W - 2 * M, nh, "F");
    doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]); doc.rect(M, y, W - 2 * M, 0.9, "F");
    spaced("An indicator, not a diagnosis", y + 7.5, 6.8, GOLD_INK, 0.7);
    font("helvetica", "normal", 8.4, GREY); var ny = centred(note, C, y + 12.5, 3.7);
    font("times", "bold", 9.8, NAVY); ny = centred(next, C, ny + 2.5, 4.5);
    font("helvetica", "bold", 8.6, NAVY);
    doc.text("asarpaul8@gmail.com   ·   +234 705 829 0711   ·   stiemfield.com", C, ny + 3.5, { align: "center" });
    font("helvetica", "normal", 7.8, GREY);
    doc.text("Asar Paul T, Founding Partner  ·  Every enquiry is answered within 24 hours.", C, ny + 7.6, { align: "center" });

    // ---- footer, on every page
    var pages = doc.getNumberOfPages();
    for (var p = 1; p <= pages; p++) {
      doc.setPage(p);
      doc.setFillColor(GOLD[0], GOLD[1], GOLD[2]); doc.rect(M, H - 15, W - 2 * M, 0.4, "F");
      font("helvetica", "bold", 7, NAVY);
      doc.text("STIEMFIELD GLOBAL CONVERGENCE LIMITED  ·  Rooted in Africa.", C, H - 10, { align: "center" });
      font("helvetica", "normal", 6.4, GREY);
      doc.text("The STIEM Framework is a proprietary instrument of the firm. We do not give legal, tax, accounting or investment advice.", C, H - 6.3, { align: "center" });
    }
    return doc;
  }

  function logoDataUrl() {
    return fetch("/brand/logo-horizontal-gold.png").then(function (res) { return res.ok ? res.blob() : null; })
      .then(function (b) {
        if (!b) return null;
        return new Promise(function (ok) { var fr = new FileReader(); fr.onload = function () { ok(fr.result); }; fr.onerror = function () { ok(null); }; fr.readAsDataURL(b); });
      }).catch(function () { return null; });
  }

  root.sgcReportPdfBuild = build;
  root.sgcReportPdf = function (jsPDF, r, T) {
    var when = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    return logoDataUrl().then(function (logo) {
      build(jsPDF, r, T, logo, when).save("Stiemfield-Convergence-Self-Check.pdf");
    });
  };
})(typeof window !== "undefined" ? window : globalThis);
