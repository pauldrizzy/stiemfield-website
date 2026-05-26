import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const PAIRS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "AVAX/USDT"];

const WATCHLIST = [
  { pair: "BTC/USDT",  price: 67654,  change: +2.14,  volume: "2.4B",  bias: "BULLISH",    conf: 74 },
  { pair: "ETH/USDT",  price: 3558,   change: +0.83,  volume: "1.1B",  bias: "BULLISH",    conf: 61 },
  { pair: "SOL/USDT",  price: 184.72, change: -1.24,  volume: "340M",  bias: "BEARISH",    conf: 55 },
  { pair: "BNB/USDT",  price: 601.30, change: +0.32,  volume: "210M",  bias: "NEUTRAL",    conf: 48 },
  { pair: "AVAX/USDT", price: 38.91,  change: -0.58,  volume: "89M",   bias: "NEUTRAL",    conf: 44 },
];

function generateCandles(base: number, n = 60) {
  const data = [];
  let price = base;
  for (let i = 0; i < n; i++) {
    price += (Math.random() - 0.48) * base * 0.006;
    data.push({
      i,
      price: +price.toFixed(2),
      ema9:  +(price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2),
      ema21: +(price * (0.998 + (Math.random() - 0.5) * 0.001)).toFixed(2),
    });
  }
  return data;
}

const CHART_DATA: Record<string, ReturnType<typeof generateCandles>> = {
  "BTC/USDT":  generateCandles(67000),
  "ETH/USDT":  generateCandles(3500),
  "SOL/USDT":  generateCandles(187),
  "BNB/USDT":  generateCandles(598),
  "AVAX/USDT": generateCandles(39.5),
};

const INDICATORS = [
  { label: "RSI(14)",    btc: "47.3",  eth: "52.1",  signal: "Neutral" },
  { label: "EMA9",       btc: "67,432", eth: "3,561", signal: "↑ Bullish cross" },
  { label: "EMA21",      btc: "67,189", eth: "3,548", signal: "" },
  { label: "MACD",       btc: "+124",  eth: "+18",   signal: "↑ Positive" },
  { label: "Bollinger",  btc: "Mid",   eth: "Upper", signal: "" },
  { label: "ATR(14)",    btc: "892",   eth: "48",    signal: "" },
];

function BiasChip({ bias }: { bias: string }) {
  if (bias === "BULLISH") return (
    <span className="flex items-center gap-1 text-xs font-mono font-semibold" style={{ color: "#00FF94" }}>
      <TrendingUp className="w-3 h-3" /> BULLISH
    </span>
  );
  if (bias === "BEARISH") return (
    <span className="flex items-center gap-1 text-xs font-mono font-semibold" style={{ color: "#FF3B6B" }}>
      <TrendingDown className="w-3 h-3" /> BEARISH
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs font-mono font-semibold" style={{ color: "#64748B" }}>
      <Minus className="w-3 h-3" /> NEUTRAL
    </span>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded p-2 text-xs font-mono" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
      <p style={{ color: "#E2E8F0" }}>${payload[0]?.value?.toLocaleString()}</p>
    </div>
  );
};

export default function MarketLab() {
  const [selected, setSelected] = useState("BTC/USDT");
  const data = CHART_DATA[selected];
  const info = WATCHLIST.find((w) => w.pair === selected)!;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Market Lab</h1>
          <span className="text-xs font-mono" style={{ color: "#64748B" }}>1H · Simulated</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Chart panel */}
          <div className="lg:col-span-2 space-y-3">
            {/* Pair tabs */}
            <div className="flex gap-1 overflow-x-auto pb-0.5">
              {PAIRS.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelected(p)}
                  className="flex-shrink-0 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                  style={{
                    background: selected === p ? "rgba(58,134,255,0.15)" : "#1E2D3D",
                    color: selected === p ? "#3A86FF" : "#64748B",
                    border: "1px solid " + (selected === p ? "rgba(58,134,255,0.3)" : "transparent"),
                  }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Price header */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-mono font-bold text-foreground">
                ${info.price.toLocaleString()}
              </span>
              <span className={`text-sm font-mono font-semibold ${info.change >= 0 ? "gain" : "loss"}`}>
                {info.change >= 0 ? "+" : ""}{info.change.toFixed(2)}% 24h
              </span>
              <span className="ml-auto text-xs font-mono" style={{ color: "#64748B" }}>Vol: {info.volume}</span>
            </div>

            {/* Chart */}
            <div className="rounded-lg overflow-hidden" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#3A86FF" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3A86FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="i" hide />
                  <YAxis
                    domain={["auto", "auto"]}
                    tickFormatter={(v) => `$${v.toLocaleString()}`}
                    tick={{ fill: "#3D5068", fontSize: 10, fontFamily: "JetBrains Mono" }}
                    width={80}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3A86FF"
                    strokeWidth={1.5}
                    fill="url(#priceGrad)"
                    dot={false}
                    activeDot={{ r: 3, fill: "#3A86FF" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="ema9"
                    stroke="#00FF94"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    fill="none"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="ema21"
                    stroke="#F59E0B"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    fill="none"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 px-4 pb-3 text-[10px] font-mono" style={{ color: "#64748B" }}>
                <span className="flex items-center gap-1"><span className="w-3 h-px inline-block" style={{ background: "#3A86FF" }} />Price</span>
                <span className="flex items-center gap-1"><span className="w-3 h-px inline-block border-t border-dashed" style={{ borderColor: "#00FF94" }} />EMA9</span>
                <span className="flex items-center gap-1"><span className="w-3 h-px inline-block border-t border-dashed" style={{ borderColor: "#F59E0B" }} />EMA21</span>
              </div>
            </div>

            {/* Indicators table */}
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #1E2D3D" }}>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr style={{ background: "#0A1120", borderBottom: "1px solid #1E2D3D" }}>
                    <th className="px-3 py-2 text-left font-medium" style={{ color: "#64748B" }}>Indicator</th>
                    <th className="px-3 py-2 text-right font-medium" style={{ color: "#64748B" }}>BTC</th>
                    <th className="px-3 py-2 text-right font-medium" style={{ color: "#64748B" }}>ETH</th>
                    <th className="px-3 py-2 text-left font-medium" style={{ color: "#64748B" }}>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {INDICATORS.map((ind) => (
                    <tr key={ind.label} className="table-row-hover" style={{ borderBottom: "1px solid #1E2D3D" }}>
                      <td className="px-3 py-2 text-foreground">{ind.label}</td>
                      <td className="px-3 py-2 text-right" style={{ color: "#94A3B8" }}>{ind.btc}</td>
                      <td className="px-3 py-2 text-right" style={{ color: "#94A3B8" }}>{ind.eth}</td>
                      <td className="px-3 py-2" style={{ color: ind.signal.includes("↑") ? "#00FF94" : "#64748B" }}>{ind.signal || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Watchlist */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Watchlist · Agent Bias
            </h2>
            <div className="space-y-2">
              {WATCHLIST.map((w) => (
                <button
                  key={w.pair}
                  onClick={() => setSelected(w.pair)}
                  className="w-full rounded-lg p-3 text-left transition-all space-y-1.5"
                  style={{
                    background: selected === w.pair ? "rgba(58,134,255,0.07)" : "#0F1724",
                    border: "1px solid " + (selected === w.pair ? "rgba(58,134,255,0.25)" : "#1E2D3D"),
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-foreground">{w.pair}</span>
                    <BiasChip bias={w.bias} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-foreground">${w.price.toLocaleString()}</span>
                    <span className={`text-xs font-mono ${w.change >= 0 ? "gain" : "loss"}`}>
                      {w.change >= 0 ? "+" : ""}{w.change.toFixed(2)}%
                    </span>
                  </div>
                  {/* Confidence bar */}
                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono" style={{ color: "#64748B" }}>Confidence</span>
                      <span className="text-[10px] font-mono" style={{ color: "#64748B" }}>{w.conf}%</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: "#1E2D3D" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${w.conf}%`,
                          background: w.bias === "BULLISH" ? "#00FF94" : w.bias === "BEARISH" ? "#FF3B6B" : "#64748B",
                        }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
