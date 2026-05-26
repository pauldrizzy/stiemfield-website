import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Play, Pause, Square, X, TrendingUp, TrendingDown } from "lucide-react";

type AgentStatus = "ACTIVE" | "PAUSED" | "STOPPED" | "PAPER";

interface Position {
  id: string;
  pair: string;
  side: "LONG" | "SHORT";
  entry: number;
  current: number;
  size: number;
  pnl: number;
  pnlPct: number;
  exchange: string;
}

interface LogLine {
  time: string;
  type: "perceive" | "reason" | "act" | "reflect" | "llm" | "error";
  text: string;
}

const INITIAL_LOGS: LogLine[] = [
  { time: "14:21:44", type: "perceive", text: "Fetching OHLCV data — BTC/USDT, ETH/USDT, SOL/USDT..." },
  { time: "14:21:45", type: "perceive", text: "BTC/USDT 1H: O:67,420 H:67,890 L:67,180 C:67,654 V:2,847 BTC" },
  { time: "14:21:45", type: "perceive", text: "ETH/USDT 1H: O:3,542 H:3,578 L:3,510 C:3,558 V:18,492 ETH" },
  { time: "14:21:46", type: "reason", text: "Computing indicators: RSI(14)=47.3 | EMA9=67,432 | EMA21=67,189" },
  { time: "14:21:46", type: "reason", text: "MACD: histogram crossing zero — bullish momentum forming" },
  { time: "14:21:47", type: "reason", text: "Volume 1.8× 20-period average. Elevated activity." },
  { time: "14:21:47", type: "llm",     text: 'LLM → "Moderate long bias BTC/USDT. EMA9>EMA21, RSI recovering. Confidence: 74%. Size: 2%."' },
  { time: "14:21:48", type: "act",     text: "Validating risk rules... Confidence 74% ≥ threshold 70% ✓" },
  { time: "14:21:48", type: "act",     text: "Kelly sizing: 2.0% × $24,847 = $496.94 notional" },
  { time: "14:21:49", type: "act",     text: "Correlation check: ETH position low correlation ✓" },
  { time: "14:21:49", type: "act",     text: "ORDER BTC/USDT LONG 0.00734 @ 67,654 | SL: 67,050 | TP: 68,850" },
  { time: "14:21:50", type: "reflect", text: "Position opened. Monitoring for exit signal..." },
];

const LIVE_LOGS: LogLine[] = [
  { time: "", type: "perceive", text: "Heartbeat tick — fetching latest candles..." },
  { time: "", type: "reason",  text: "BTC RSI(14) now 49.1 — neutral zone. Holding." },
  { time: "", type: "reason",  text: "ETH funding rate: 0.012% — within acceptable range." },
  { time: "", type: "llm",     text: 'LLM → "No new entries. Hold existing positions. Confidence: 61%."' },
  { time: "", type: "act",     text: "Confidence 61% < threshold 70% — no action taken." },
  { time: "", type: "perceive", text: "Order book depth BTC/USDT: bid wall at 67,200. Support holding." },
  { time: "", type: "reason",  text: "Open interest increased 3.2% — long accumulation signal." },
  { time: "", type: "reflect", text: "BTC position +$184.20 (+2.74%). TP target at 68,850 (-$756 away)." },
];

function now() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

const METRICS = [
  { label: "Total Equity",   value: "$24,847.32",  sub: "+$347.18 today",    gainClass: "gain" },
  { label: "Today P&L",      value: "+$347.18",    sub: "+1.42%",            gainClass: "gain" },
  { label: "7D P&L",         value: "+$1,203.44",  sub: "+5.10%",            gainClass: "gain" },
  { label: "Win Rate",       value: "68.3%",       sub: "41 of 60 trades",   gainClass: "" },
  { label: "Sharpe Ratio",   value: "1.84",        sub: "30-day rolling",    gainClass: "" },
  { label: "Max Drawdown",   value: "-8.2%",       sub: "since inception",   gainClass: "loss" },
];

const INITIAL_POSITIONS: Position[] = [
  {
    id: "1",
    pair: "BTC/USDT",
    side: "LONG",
    entry: 67250,
    current: 67890,
    size: 0.00734,
    pnl: 184.20,
    pnlPct: 2.74,
    exchange: "Bybit",
  },
  {
    id: "2",
    pair: "ETH/USDT",
    side: "LONG",
    entry: 3542,
    current: 3518,
    size: 0.14,
    pnl: -24.00,
    pnlPct: -0.68,
    exchange: "Bitget",
  },
];

export default function CommandCenter() {
  const [status, setStatus] = useState<AgentStatus>("PAPER");
  const [logs, setLogs] = useState<LogLine[]>(INITIAL_LOGS);
  const [positions, setPositions] = useState<Position[]>(INITIAL_POSITIONS);
  const terminalRef = useRef<HTMLDivElement>(null);
  const logIdx = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const entry = LIVE_LOGS[logIdx.current % LIVE_LOGS.length];
      setLogs((prev) => [...prev.slice(-80), { ...entry, time: now() }]);
      logIdx.current++;
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Drift positions slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((p) => {
          const drift = (Math.random() - 0.48) * (p.pair.includes("BTC") ? 12 : 1.5);
          const newCurrent = +(p.current + drift).toFixed(2);
          const rawPnl = (newCurrent - p.entry) * p.size * (p.side === "LONG" ? 1 : -1);
          const newPnl = +rawPnl.toFixed(2);
          const newPct = +((newPnl / (p.entry * p.size)) * 100).toFixed(2);
          return { ...p, current: newCurrent, pnl: newPnl, pnlPct: newPct };
        })
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  function closePosition(id: string) {
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setLogs((prev) => [
      ...prev,
      { time: now(), type: "act", text: `Manual close executed for position ${id}.` },
    ]);
  }

  function statusPill() {
    if (status === "ACTIVE")  return <span className="status-active"><span className="w-1.5 h-1.5 rounded-full bg-current blink" />ACTIVE</span>;
    if (status === "PAUSED")  return <span className="status-paused"><span className="w-1.5 h-1.5 rounded-full bg-current" />PAUSED</span>;
    if (status === "STOPPED") return <span className="status-stopped"><span className="w-1.5 h-1.5 rounded-full bg-current" />STOPPED</span>;
    return <span className="status-paper"><span className="w-1.5 h-1.5 rounded-full bg-current" />PAPER</span>;
  }

  function logColor(type: LogLine["type"]) {
    if (type === "perceive") return "#94A3B8";
    if (type === "reason")   return "#3A86FF";
    if (type === "act")      return "#F59E0B";
    if (type === "reflect")  return "#8B5CF6";
    if (type === "llm")      return "#00FF94";
    return "#FF3B6B";
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
              Command Center
            </h1>
            <p className="text-xs font-mono mt-0.5" style={{ color: "#64748B" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · {now()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {statusPill()}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setStatus("ACTIVE")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                style={{
                  background: status === "ACTIVE" ? "rgba(0,255,148,0.15)" : "#1E2D3D",
                  color: status === "ACTIVE" ? "#00FF94" : "#94A3B8",
                  border: "1px solid " + (status === "ACTIVE" ? "rgba(0,255,148,0.3)" : "transparent"),
                }}
              >
                <Play className="w-3 h-3" /> Start
              </button>
              <button
                onClick={() => setStatus("PAUSED")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                style={{
                  background: status === "PAUSED" ? "rgba(245,158,11,0.15)" : "#1E2D3D",
                  color: status === "PAUSED" ? "#F59E0B" : "#94A3B8",
                  border: "1px solid " + (status === "PAUSED" ? "rgba(245,158,11,0.3)" : "transparent"),
                }}
              >
                <Pause className="w-3 h-3" /> Pause
              </button>
              <button
                onClick={() => setStatus("STOPPED")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                style={{
                  background: status === "STOPPED" ? "rgba(255,59,107,0.15)" : "#1E2D3D",
                  color: status === "STOPPED" ? "#FF3B6B" : "#94A3B8",
                  border: "1px solid " + (status === "STOPPED" ? "rgba(255,59,107,0.3)" : "transparent"),
                }}
              >
                <Square className="w-3 h-3" /> Stop
              </button>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {METRICS.map((m) => (
            <div key={m.label} className="stat-card">
              <p className="stat-label">{m.label}</p>
              <p className={`stat-value text-xl ${m.gainClass}`}>{m.value}</p>
              <p className="text-xs font-mono" style={{ color: "#64748B" }}>{m.sub}</p>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Agent Thoughts Terminal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Agent Thoughts
              </h2>
              <span className="text-xs font-mono" style={{ color: "#3A86FF" }}>
                LIVE <span className="blink">▮</span>
              </span>
            </div>
            <div ref={terminalRef} className="terminal p-3 h-72">
              {logs.map((line, i) => (
                <div key={i} className="flex gap-2">
                  <span className="flex-shrink-0" style={{ color: "#3D5068" }}>{line.time}</span>
                  <span
                    className="flex-shrink-0 uppercase w-8"
                    style={{ color: logColor(line.type) }}
                  >
                    {line.type === "perceive" ? "PRC" :
                     line.type === "reason"   ? "RSN" :
                     line.type === "act"      ? "ACT" :
                     line.type === "reflect"  ? "RFL" :
                     line.type === "llm"      ? "LLM" : "ERR"}
                  </span>
                  <span style={{ color: logColor(line.type) }}>{line.text}</span>
                </div>
              ))}
              <div className="flex gap-2 mt-1">
                <span style={{ color: "#3D5068" }}>{now()}</span>
                <span style={{ color: "#00FF94" }}>▮<span className="blink">_</span></span>
              </div>
            </div>
          </div>

          {/* Active Positions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Active Positions
              </h2>
              <span className="text-xs font-mono" style={{ color: "#64748B" }}>
                {positions.length} open
              </span>
            </div>
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #1E2D3D" }}>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr style={{ background: "#0A1120", borderBottom: "1px solid #1E2D3D" }}>
                    {["Pair", "Side", "Entry", "Mark", "PnL", ""].map((h) => (
                      <th key={h} className="px-3 py-2 text-left font-medium" style={{ color: "#64748B" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-3 py-8 text-center" style={{ color: "#3D5068" }}>
                        No open positions
                      </td>
                    </tr>
                  )}
                  {positions.map((p) => (
                    <tr key={p.id} className="table-row-hover" style={{ borderBottom: "1px solid #1E2D3D" }}>
                      <td className="px-3 py-2.5 font-semibold text-foreground">{p.pair}</td>
                      <td className="px-3 py-2.5">
                        {p.side === "LONG"
                          ? <span className="badge-long">LONG</span>
                          : <span className="badge-short">SHORT</span>}
                      </td>
                      <td className="px-3 py-2.5" style={{ color: "#94A3B8" }}>{p.entry.toLocaleString()}</td>
                      <td className="px-3 py-2.5 text-foreground">{p.current.toLocaleString()}</td>
                      <td className="px-3 py-2.5">
                        <div className={p.pnl >= 0 ? "gain" : "loss"}>
                          <div className="flex items-center gap-1">
                            {p.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            ${Math.abs(p.pnl).toFixed(2)}
                          </div>
                          <div className="text-[10px] opacity-75">
                            {p.pnlPct >= 0 ? "+" : ""}{p.pnlPct.toFixed(2)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <button
                          onClick={() => closePosition(p.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all"
                          style={{ background: "rgba(255,59,107,0.1)", color: "#FF3B6B", border: "1px solid rgba(255,59,107,0.2)" }}
                        >
                          <X className="w-3 h-3" /> Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Exchange selector */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {["Bybit", "Bitget", "Both"].map((ex) => (
                <button
                  key={ex}
                  className="py-1.5 rounded text-xs font-mono font-medium transition-all"
                  style={{ background: ex === "Both" ? "rgba(58,134,255,0.15)" : "#1E2D3D", color: ex === "Both" ? "#3A86FF" : "#64748B", border: "1px solid " + (ex === "Both" ? "rgba(58,134,255,0.3)" : "transparent") }}
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Daily Loss Used", value: "32%", color: "#F59E0B" },
                { label: "Positions Used", value: "2 / 5", color: "#94A3B8" },
                { label: "Heartbeat", value: "5 min", color: "#3A86FF" },
              ].map((s) => (
                <div key={s.label} className="rounded p-2 text-center" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
                  <p className="text-[10px] font-mono" style={{ color: "#64748B" }}>{s.label}</p>
                  <p className="text-sm font-mono font-semibold mt-0.5" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
