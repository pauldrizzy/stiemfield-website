import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { AlertTriangle, CheckCircle, Save } from "lucide-react";

interface RiskConfig {
  maxPerTradePct: number;
  dailyLossLimitPct: number;
  maxPositions: number;
  maxLeverage: number;
  defaultSLPct: number;
  defaultTPPct: number;
  cooldownMinutes: number;
  confidenceThreshold: number;
  slippageGuardPct: number;
}

const DEFAULTS: RiskConfig = {
  maxPerTradePct: 2,
  dailyLossLimitPct: 5,
  maxPositions: 5,
  maxLeverage: 3,
  defaultSLPct: 1.5,
  defaultTPPct: 3.0,
  cooldownMinutes: 30,
  confidenceThreshold: 70,
  slippageGuardPct: 0.5,
};

function SliderField({
  label, desc, value, min, max, step, unit, color, onChange,
}: {
  label: string; desc: string; value: number; min: number; max: number; step: number;
  unit: string; color?: string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{desc}</p>
        </div>
        <span className="text-lg font-mono font-bold" style={{ color: color || "#E2E8F0" }}>
          {value}{unit}
        </span>
      </div>
      <div className="relative">
        <div className="h-1.5 rounded-full" style={{ background: "#1E2D3D" }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: color || "#3A86FF" }}
          />
        </div>
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(+e.target.value)}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono" style={{ color: "#3D5068" }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

export default function RiskConsole() {
  const [config, setConfig] = useState<RiskConfig>(DEFAULTS);
  const [saved, setSaved] = useState(false);

  function set(key: keyof RiskConfig, value: number) {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const dailyRiskColor = config.dailyLossLimitPct <= 3 ? "#00FF94" : config.dailyLossLimitPct <= 6 ? "#F59E0B" : "#FF3B6B";
  const leverageColor  = config.maxLeverage <= 2 ? "#00FF94" : config.maxLeverage <= 5 ? "#F59E0B" : "#FF3B6B";

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Risk Console</h1>
          <button
            onClick={save}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-mono font-medium transition-all"
            style={{
              background: saved ? "rgba(0,255,148,0.15)" : "rgba(58,134,255,0.15)",
              color: saved ? "#00FF94" : "#3A86FF",
              border: "1px solid " + (saved ? "rgba(0,255,148,0.3)" : "rgba(58,134,255,0.3)"),
            }}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved" : "Save Config"}
          </button>
        </div>

        {/* Warning banner */}
        <div className="flex items-start gap-3 rounded-lg px-4 py-3" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
          <p className="text-xs font-mono leading-relaxed" style={{ color: "#F59E0B" }}>
            Risk rules are enforced by the agent on every trade. Changes take effect on the next heartbeat cycle.
            Stop-loss is mandatory and cannot be disabled.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left column */}
          <div className="space-y-5">
            <div className="rounded-lg p-5 space-y-5" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Position Sizing
              </h2>
              <SliderField
                label="Max % per Trade"
                desc="Kelly-capped maximum allocation per single position"
                value={config.maxPerTradePct} min={0.5} max={10} step={0.5} unit="%"
                onChange={(v) => set("maxPerTradePct", v)}
              />
              <SliderField
                label="Max Concurrent Positions"
                desc="Hard limit on simultaneously open trades"
                value={config.maxPositions} min={1} max={10} step={1} unit=""
                onChange={(v) => set("maxPositions", v)}
              />
              <SliderField
                label="Max Leverage (Futures)"
                desc="Cross-margin leverage cap applied at order creation"
                value={config.maxLeverage} min={1} max={20} step={1} unit="×"
                color={leverageColor}
                onChange={(v) => set("maxLeverage", v)}
              />
            </div>

            <div className="rounded-lg p-5 space-y-5" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Stop-Loss / Take-Profit
              </h2>
              <SliderField
                label="Default Stop-Loss"
                desc="Auto-applied SL distance from entry price"
                value={config.defaultSLPct} min={0.5} max={5} step={0.25} unit="%"
                color="#FF3B6B"
                onChange={(v) => set("defaultSLPct", v)}
              />
              <SliderField
                label="Default Take-Profit"
                desc="Auto-applied TP target from entry price"
                value={config.defaultTPPct} min={0.5} max={15} step={0.25} unit="%"
                color="#00FF94"
                onChange={(v) => set("defaultTPPct", v)}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <div className="rounded-lg p-5 space-y-5" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                Circuit Breakers
              </h2>
              <SliderField
                label="Daily Loss Limit"
                desc="Agent auto-pauses for 24h when this % of equity is lost in one day"
                value={config.dailyLossLimitPct} min={1} max={15} step={0.5} unit="%"
                color={dailyRiskColor}
                onChange={(v) => set("dailyLossLimitPct", v)}
              />
              <SliderField
                label="Cooldown After Loss"
                desc="Minutes agent waits before re-entering after a stopped-out trade"
                value={config.cooldownMinutes} min={0} max={120} step={5} unit=" min"
                onChange={(v) => set("cooldownMinutes", v)}
              />
            </div>

            <div className="rounded-lg p-5 space-y-5" style={{ background: "#0F1724", border: "1px solid #1E2D3D" }}>
              <h2 className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: "#64748B" }}>
                AI Thresholds
              </h2>
              <SliderField
                label="Confidence Floor"
                desc="Minimum LLM confidence score required before executing any trade"
                value={config.confidenceThreshold} min={50} max={95} step={5} unit="%"
                color="#3A86FF"
                onChange={(v) => set("confidenceThreshold", v)}
              />
              <SliderField
                label="Slippage Guard"
                desc="Cancel order if price moves more than this % before fill"
                value={config.slippageGuardPct} min={0.1} max={2} step={0.1} unit="%"
                onChange={(v) => set("slippageGuardPct", v)}
              />
            </div>

            {/* Summary card */}
            <div className="rounded-lg p-4 space-y-2" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
              <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#64748B" }}>Risk Summary</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Max/Trade", value: `${config.maxPerTradePct}%` },
                  { label: "Daily Limit", value: `${config.dailyLossLimitPct}%` },
                  { label: "Min Conf.", value: `${config.confidenceThreshold}%` },
                  { label: "SL Default", value: `${config.defaultSLPct}%` },
                  { label: "TP Default", value: `${config.defaultTPPct}%` },
                  { label: "Max Lev.", value: `${config.maxLeverage}×` },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-[9px] font-mono" style={{ color: "#3D5068" }}>{s.label}</p>
                    <p className="text-xs font-mono font-semibold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
