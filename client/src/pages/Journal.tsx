import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Download, TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";

interface Trade {
  id: string;
  pair: string;
  side: "LONG" | "SHORT";
  entry: number;
  exit: number;
  size: number;
  pnl: number;
  pnlPct: number;
  date: string;
  duration: string;
  exchange: string;
  reasoning: string;
  reflection: string;
}

const TRADES: Trade[] = [
  {
    id: "t001", pair: "BTC/USDT", side: "LONG", entry: 66420, exit: 67850, size: 0.0082,
    pnl: 294.84, pnlPct: 3.31, date: "2026-05-16 09:14", duration: "4h 22m", exchange: "Bybit",
    reasoning: "EMA9 crossed above EMA21 on 1H. RSI recovering from 32 (oversold). Volume 2.1× average. MACD histogram turning positive. LLM confidence: 78%.",
    reflection: "Clean breakout trade. EMA cross was genuine. Entry was slightly early — waiting for MACD confirmation would have improved the R:R. TP hit within 4 hours. Consistent with strategy.",
  },
  {
    id: "t002", pair: "ETH/USDT", side: "SHORT", entry: 3621, exit: 3590, size: 0.19,
    pnl: 147.30, pnlPct: 1.64, date: "2026-05-15 14:02", duration: "1h 51m", exchange: "Bitget",
    reasoning: "RSI overbought at 73. Price at upper Bollinger Band. Bearish engulfing on 1H. Funding rate elevated at +0.08%. LLM confidence: 71%.",
    reflection: "Quick scalp worked well. Funding rate signal was the strongest indicator. Short duration aligns with overbought exits. No issues.",
  },
  {
    id: "t003", pair: "SOL/USDT", side: "LONG", entry: 192.40, exit: 188.80, size: 2.8,
    pnl: -252.00, pnlPct: -3.10, date: "2026-05-15 08:30", duration: "2h 10m", exchange: "Bybit",
    reasoning: "Support level held at 190. EMA9/21 convergence. Volume uptick. LLM confidence: 72%.",
    reflection: "Support broke shortly after entry. Should have required RSI confirmation before entering. Stop was hit cleanly at -3%. The open interest signal was declining — this should have flagged caution. Lesson: require OI confirmation on SOL entries.",
  },
  {
    id: "t004", pair: "BTC/USDT", side: "LONG", entry: 65880, exit: 67120, size: 0.0091,
    pnl: 376.44, pnlPct: 4.15, date: "2026-05-14 11:45", duration: "6h 33m", exchange: "Bybit",
    reasoning: "Double bottom pattern on 4H. RSI divergence. EMA stack aligned bullish. High confidence LLM call at 83%.",
    reflection: "Best trade of the week. High-conviction setup with multiple converging signals. Held full duration to TP. The 4H pattern recognition by LLM was accurate. Replicate this setup.",
  },
  {
    id: "t005", pair: "BNB/USDT", side: "SHORT", entry: 614, exit: 618, size: 0.95,
    pnl: -76.00, pnlPct: -1.22, date: "2026-05-13 16:20", duration: "45m", exchange: "Bitget",
    reasoning: "RSI 68, approaching overbought. Volume fading. LLM confidence: 65% — below threshold but allowed through (threshold was 60% at time).",
    reflection: "Below-threshold trade that failed. Confidence was 65% — this is why the threshold is now 70%. Stop hit within 45 minutes. Direct cause: threshold was too low. Fix applied.",
  },
  {
    id: "t006", pair: "ETH/USDT", side: "LONG", entry: 3490, exit: 3551, size: 0.22,
    pnl: 267.08, pnlPct: 3.24, date: "2026-05-13 09:00", duration: "3h 12m", exchange: "Bitget",
    reasoning: "MACD bullish crossover. EMA9 turning up from EMA21. Volume spike on 1H open. RSI 44 — room to run. LLM confidence: 76%.",
    reflection: "Textbook momentum entry. All indicators aligned. Exited at TP cleanly. No improvements needed.",
  },
];

const SUMMARY = [
  { label: "Total Trades",  value: "60" },
  { label: "Win Rate",      value: "68.3%", color: "#00FF94" },
  { label: "Total P&L",     value: "+$1,203.44", color: "#00FF94" },
  { label: "Avg Win",       value: "+$284.12", color: "#00FF94" },
  { label: "Avg Loss",      value: "-$164.00", color: "#FF3B6B" },
  { label: "Profit Factor", value: "2.14" },
];

export default function Journal() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "win" | "loss">("all");

  const filtered = TRADES.filter((t) => {
    if (filter === "win")  return t.pnl > 0;
    if (filter === "loss") return t.pnl < 0;
    return true;
  });

  function exportCSV() {
    const header = "Date,Pair,Side,Entry,Exit,Size,P&L,P&L%,Duration,Exchange";
    const rows = TRADES.map((t) =>
      `${t.date},${t.pair},${t.side},${t.entry},${t.exit},${t.size},${t.pnl},${t.pnlPct}%,${t.duration},${t.exchange}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "stiemfield-journal.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Journal</h1>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
            style={{ background: "#1E2D3D", color: "#94A3B8", border: "1px solid #1E2D3D" }}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {SUMMARY.map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-label">{s.label}</p>
              <p className="text-lg font-mono font-bold mt-1" style={{ color: s.color || "#E2E8F0" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-1.5">
          {(["all", "win", "loss"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded text-xs font-mono font-medium capitalize transition-all"
              style={{
                background: filter === f ? (f === "win" ? "rgba(0,255,148,0.15)" : f === "loss" ? "rgba(255,59,107,0.15)" : "rgba(58,134,255,0.15)") : "#1E2D3D",
                color: filter === f ? (f === "win" ? "#00FF94" : f === "loss" ? "#FF3B6B" : "#3A86FF") : "#64748B",
                border: "1px solid " + (filter === f ? (f === "win" ? "rgba(0,255,148,0.3)" : f === "loss" ? "rgba(255,59,107,0.3)" : "rgba(58,134,255,0.3)") : "transparent"),
              }}
            >
              {f === "all" ? "All Trades" : f === "win" ? "Winners" : "Losers"}
            </button>
          ))}
          <span className="ml-2 text-xs font-mono self-center" style={{ color: "#3D5068" }}>
            {filtered.length} trades
          </span>
        </div>

        {/* Trade list */}
        <div className="space-y-2">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="rounded-lg overflow-hidden"
              style={{
                background: "#0F1724",
                border: "1px solid " + (t.pnl > 0 ? "rgba(0,255,148,0.15)" : "rgba(255,59,107,0.15)"),
              }}
            >
              {/* Row header */}
              <button
                onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className="flex-1 grid grid-cols-2 md:grid-cols-6 gap-2 items-center text-xs font-mono">
                  <span className="font-semibold text-foreground">{t.pair}</span>
                  <span>{t.side === "LONG" ? <span className="badge-long">LONG</span> : <span className="badge-short">SHORT</span>}</span>
                  <span style={{ color: "#64748B" }}>{t.date.split(" ")[0]}</span>
                  <span style={{ color: "#64748B" }}>{t.exchange}</span>
                  <span style={{ color: "#64748B" }}>{t.duration}</span>
                  <span className={t.pnl > 0 ? "gain" : "loss"}>
                    <span className="flex items-center gap-1">
                      {t.pnl > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {t.pnl > 0 ? "+" : ""}${Math.abs(t.pnl).toFixed(2)} ({t.pnlPct > 0 ? "+" : ""}{t.pnlPct.toFixed(2)}%)
                    </span>
                  </span>
                </div>
                {expanded === t.id ? <ChevronUp className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#64748B" }} /> : <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#64748B" }} />}
              </button>

              {/* Expanded detail */}
              {expanded === t.id && (
                <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: "#1E2D3D" }}>
                  <div className="grid grid-cols-4 gap-3 pt-3">
                    {[
                      { label: "Entry", value: `$${t.entry.toLocaleString()}` },
                      { label: "Exit",  value: `$${t.exit.toLocaleString()}` },
                      { label: "Size",  value: `${t.size} ${t.pair.split("/")[0]}` },
                      { label: "P&L",   value: `${t.pnl > 0 ? "+" : ""}$${Math.abs(t.pnl).toFixed(2)}`, color: t.pnl > 0 ? "#00FF94" : "#FF3B6B" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-[10px] font-mono" style={{ color: "#3D5068" }}>{s.label}</p>
                        <p className="text-xs font-mono font-semibold mt-0.5" style={{ color: s.color || "#E2E8F0" }}>{s.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="rounded p-3 space-y-1" style={{ background: "#080C12" }}>
                      <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#3A86FF" }}>Pre-Trade Reasoning</p>
                      <p className="text-xs font-mono leading-relaxed" style={{ color: "#94A3B8" }}>{t.reasoning}</p>
                    </div>
                    <div className="rounded p-3 space-y-1" style={{ background: "#080C12" }}>
                      <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#8B5CF6" }}>Post-Trade Reflection</p>
                      <p className="text-xs font-mono leading-relaxed" style={{ color: "#94A3B8" }}>{t.reflection}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
