import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { CheckCircle, Circle, Play } from "lucide-react";

type Preset = "Conservative" | "Balanced" | "Aggressive" | "Custom";

const PRESETS: { name: Preset; desc: string; color: string; risk: string }[] = [
  { name: "Conservative", desc: "Low frequency, high confidence. Min 80% confidence, 1% max size.", color: "#3A86FF", risk: "Low" },
  { name: "Balanced",     desc: "Moderate signals, Kelly-capped sizing. Min 70% confidence, 2%.",   color: "#00FF94", risk: "Medium" },
  { name: "Aggressive",   desc: "High frequency, wider thresholds. Min 60% confidence, 4% max.",    color: "#F59E0B", risk: "High" },
  { name: "Custom",       desc: "Configure your own thresholds below.",                              color: "#8B5CF6", risk: "Custom" },
];

interface IndicatorConfig {
  key: string;
  label: string;
  enabled: boolean;
  params: string;
}

const DEFAULT_INDICATORS: IndicatorConfig[] = [
  { key: "rsi",  label: "RSI (14)",          enabled: true,  params: "Oversold < 35 | Overbought > 65" },
  { key: "ema",  label: "EMA 9 / 21 / 50",   enabled: true,  params: "Cross signal: EMA9 > EMA21" },
  { key: "macd", label: "MACD (12,26,9)",     enabled: true,  params: "Histogram > 0 = bullish" },
  { key: "bb",   label: "Bollinger Bands",    enabled: false, params: "Band width ± 2σ" },
  { key: "atr",  label: "ATR (14)",           enabled: true,  params: "Used for SL/TP sizing" },
  { key: "vwap", label: "VWAP",               enabled: false, params: "Price vs. VWAP bias" },
  { key: "oi",   label: "Open Interest",      enabled: false, params: "OI increase > 5% = confirm" },
  { key: "fund", label: "Funding Rate",       enabled: true,  params: "Skip if |rate| > 0.05%" },
];

function generateEquityCurve(base = 20000, n = 90) {
  const data = [];
  let equity = base;
  const benchmark = base;
  for (let i = 0; i < n; i++) {
    equity += (Math.random() - 0.44) * equity * 0.012;
    data.push({
      day: i + 1,
      equity: +equity.toFixed(2),
      benchmark: +(benchmark * (1 + i * 0.0004)).toFixed(2),
    });
  }
  return data;
}

const BACKTEST: Record<Preset, { data: ReturnType<typeof generateEquityCurve>; stats: { label: string; value: string; color?: string }[] }> = {
  Conservative: {
    data: generateEquityCurve(20000),
    stats: [
      { label: "Total Return", value: "+18.4%", color: "#00FF94" },
      { label: "Win Rate",     value: "72.1%" },
      { label: "Sharpe",       value: "1.92" },
      { label: "Max DD",       value: "-5.1%", color: "#FF3B6B" },
      { label: "Trades",       value: "24" },
    ],
  },
  Balanced: {
    data: generateEquityCurve(20000),
    stats: [
      { label: "Total Return", value: "+31.7%", color: "#00FF94" },
      { label: "Win Rate",     value: "66.8%" },
      { label: "Sharpe",       value: "1.67" },
      { label: "Max DD",       value: "-9.3%", color: "#FF3B6B" },
      { label: "Trades",       value: "61" },
    ],
  },
  Aggressive: {
    data: generateEquityCurve(20000),
    stats: [
      { label: "Total Return", value: "+54.2%", color: "#00FF94" },
      { label: "Win Rate",     value: "58.3%" },
      { label: "Sharpe",       value: "1.21" },
      { label: "Max DD",       value: "-18.7%", color: "#FF3B6B" },
      { label: "Trades",       value: "138" },
    ],
  },
  Custom: {
    data: generateEquityCurve(20000),
    stats: [
      { label: "Total Return", value: "—" },
      { label: "Win Rate",     value: "—" },
      { label: "Sharpe",       value: "—" },
      { label: "Max DD",       value: "—" },
      { label: "Trades",       value: "—" },
    ],
  },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded p-2 text-xs font-mono" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
      <p style={{ color: "#00FF94" }}>Strategy: ${payload[0]?.value?.toLocaleString()}</p>
      <p style={{ color: "#64748B" }}>B&H: ${payload[1]?.value?.toLocaleString()}</p>
    </div>
  );
};

export default function StrategyStudio() {
  const [preset, setPreset] = useState<Preset>("Balanced");
  const [indicators, setIndicators] = useState(DEFAULT_INDICATORS);
  const [backtested, setBacktested] = useState(false);
  const [running, setRunning] = useState(false);

  function toggleIndicator(key: string) {
    setIndicators((prev) => prev.map((i) => i.key === key ? { ...i, enabled: !i.enabled } : i));
  }

  function runBacktest() {
    setRunning(true);
    setTimeout(() => { setRunning(false); setBacktested(true); }, 1400);
  }

  const bt = BACKTEST[preset];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Strategy Studio</h1>
          <span className="text-xs font-mono" style={{ color: "#64748B" }}>90-day backtest window</span>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => { setPreset(p.name); setBacktested(false); }}
              className="rounded-lg p-4 text-left transition-all space-y-2"
              style={{
                background: preset === p.name ? `rgba(58,134,255,0.07)` : "#0F1724",
                border: "1px solid " + (preset === p.name ? p.color + "55" : "#1E2D3D"),
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold" style={{ color: preset === p.name ? p.color : "#94A3B8" }}>
                  {p.name.toUpperCase()}
                </span>
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: p.color + "22", color: p.color }}
                >
                  {p.risk}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "#64748B" }}>{p.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Indicator toggles */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
              Indicators
            </h2>
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #1E2D3D" }}>
              {indicators.map((ind, i) => (
                <button
                  key={ind.key}
                  onClick={() => toggleIndicator(ind.key)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary/40"
                  style={{ borderBottom: i < indicators.length - 1 ? "1px solid #1E2D3D" : "none" }}
                >
                  {ind.enabled
                    ? <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: "#00FF94" }} />
                    : <Circle className="w-4 h-4 flex-shrink-0" style={{ color: "#3D5068" }} />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-medium" style={{ color: ind.enabled ? "#E2E8F0" : "#64748B" }}>
                      {ind.label}
                    </p>
                    <p className="text-[10px] font-mono" style={{ color: "#3D5068" }}>{ind.params}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Backtest panel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Backtest · {preset}
              </h2>
              <button
                onClick={runBacktest}
                disabled={running}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                style={{ background: "rgba(58,134,255,0.15)", color: "#3A86FF", border: "1px solid rgba(58,134,255,0.3)", opacity: running ? 0.7 : 1 }}
              >
                <Play className="w-3 h-3" />
                {running ? "Running..." : "Run Backtest"}
              </button>
            </div>

            {backtested ? (
              <>
                {/* Stats row */}
                <div className="grid grid-cols-5 gap-1.5">
                  {bt.stats.map((s) => (
                    <div key={s.label} className="rounded p-2 text-center" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
                      <p className="text-[9px] font-mono" style={{ color: "#64748B" }}>{s.label}</p>
                      <p className="text-xs font-mono font-semibold mt-0.5" style={{ color: s.color || "#E2E8F0" }}>{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Equity curve */}
                <div className="rounded-lg overflow-hidden" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-[10px] font-mono" style={{ color: "#64748B" }}>Equity Curve — last 90 days</p>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={bt.data} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id="eqGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#00FF94" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" hide />
                      <YAxis
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        tick={{ fill: "#3D5068", fontSize: 9, fontFamily: "JetBrains Mono" }}
                        width={40}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="equity"    stroke="#00FF94" strokeWidth={1.5} fill="url(#eqGrad)" dot={false} />
                      <Area type="monotone" dataKey="benchmark" stroke="#3D5068" strokeWidth={1} fill="none" strokeDasharray="3 3" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-4 px-4 pb-3 text-[10px] font-mono" style={{ color: "#64748B" }}>
                    <span className="flex items-center gap-1"><span className="w-3 h-px inline-block" style={{ background: "#00FF94" }} />Strategy</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-px inline-block border-t border-dashed" style={{ borderColor: "#3D5068" }} />Buy & Hold</span>
                  </div>
                </div>
              </>
            ) : (
              <div
                className="rounded-lg flex items-center justify-center h-64 text-xs font-mono"
                style={{ background: "#0A1120", border: "1px solid #1E2D3D", color: "#3D5068" }}
              >
                Configure indicators and press Run Backtest
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
