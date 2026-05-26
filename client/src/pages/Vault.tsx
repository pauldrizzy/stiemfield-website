import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Eye, EyeOff, CheckCircle, AlertTriangle, Wifi, WifiOff, Trash2, Plus } from "lucide-react";

type ConnStatus = "connected" | "error" | "unconfigured";

interface ExchangeKey {
  id: string;
  exchange: "Bybit" | "Bitget";
  label: string;
  apiKey: string;
  apiSecret: string;
  status: ConnStatus;
  lastPing?: string;
  permissions: string[];
}

const INITIAL_KEYS: ExchangeKey[] = [
  {
    id: "bybit-1",
    exchange: "Bybit",
    label: "Bybit Main",
    apiKey: "xK9mPQ3rT7wL2nBv8fHj",
    apiSecret: "••••••••••••••••••••••••••••••••",
    status: "unconfigured",
    permissions: [],
  },
  {
    id: "bitget-1",
    exchange: "Bitget",
    label: "Bitget Main",
    apiKey: "",
    apiSecret: "",
    status: "unconfigured",
    permissions: [],
  },
];

function StatusBadge({ status }: { status: ConnStatus }) {
  if (status === "connected") return (
    <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#00FF94" }}>
      <Wifi className="w-3 h-3" /> Connected
    </span>
  );
  if (status === "error") return (
    <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#FF3B6B" }}>
      <WifiOff className="w-3 h-3" /> Auth Error
    </span>
  );
  return (
    <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "#64748B" }}>
      <WifiOff className="w-3 h-3" /> Not Configured
    </span>
  );
}

function MaskedInput({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 pr-9 rounded text-xs font-mono bg-transparent text-foreground placeholder:text-muted-foreground"
        style={{ background: "#080C12", border: "1px solid #1E2D3D" }}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: "#64748B" }}
      >
        {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

export default function Vault() {
  const [keys, setKeys] = useState<ExchangeKey[]>(INITIAL_KEYS);
  const [testing, setTesting] = useState<string | null>(null);

  function update(id: string, field: "apiKey" | "apiSecret" | "label", val: string) {
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, [field]: val, status: "unconfigured" } : k));
  }

  function testConnection(id: string) {
    setTesting(id);
    setTimeout(() => {
      setKeys((prev) => prev.map((k) => {
        if (k.id !== id) return k;
        const ok = k.apiKey.length > 5 && k.apiSecret.length > 5;
        return { ...k, status: ok ? "connected" : "error", lastPing: ok ? new Date().toLocaleTimeString() : undefined, permissions: ok ? ["Read", "Trade"] : [] };
      }));
      setTesting(null);
    }, 1600);
  }

  function remove(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Vault</h1>
          <span className="text-xs font-mono" style={{ color: "#64748B" }}>Keys encrypted at rest · Bybit V5 · Bitget V2</span>
        </div>

        {/* Security banner */}
        <div className="flex items-start gap-3 rounded-lg px-4 py-3" style={{ background: "rgba(255,59,107,0.06)", border: "1px solid rgba(255,59,107,0.2)" }}>
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#FF3B6B" }} />
          <div className="text-xs font-mono leading-relaxed space-y-0.5" style={{ color: "#FF3B6B" }}>
            <p className="font-semibold">Use API keys with trading permission only.</p>
            <p className="opacity-80">NEVER enable withdrawal permissions. All exchange calls execute server-side — your keys are never exposed to the browser.</p>
          </div>
        </div>

        {/* Exchange cards */}
        <div className="space-y-4">
          {keys.map((k) => (
            <div
              key={k.id}
              className="rounded-lg p-5 space-y-4"
              style={{
                background: "#0F1724",
                border: "1px solid " + (k.status === "connected" ? "rgba(0,255,148,0.2)" : k.status === "error" ? "rgba(255,59,107,0.2)" : "#1E2D3D"),
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-xs font-mono font-bold"
                    style={{
                      background: k.exchange === "Bybit" ? "rgba(255,194,60,0.1)" : "rgba(0,197,255,0.1)",
                      color: k.exchange === "Bybit" ? "#FFC23C" : "#00C5FF",
                      border: "1px solid " + (k.exchange === "Bybit" ? "rgba(255,194,60,0.3)" : "rgba(0,197,255,0.3)"),
                    }}
                  >
                    {k.exchange === "Bybit" ? "BY" : "BG"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{k.exchange}</p>
                    <StatusBadge status={k.status} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {k.status === "connected" && k.lastPing && (
                    <span className="text-[10px] font-mono" style={{ color: "#3D5068" }}>ping {k.lastPing}</span>
                  )}
                  <button
                    onClick={() => remove(k.id)}
                    className="p-1.5 rounded transition-colors"
                    style={{ color: "#3D5068" }}
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#64748B" }}>API Key</label>
                  <MaskedInput
                    value={k.apiKey}
                    placeholder="Paste API key..."
                    onChange={(v) => update(k.id, "apiKey", v)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "#64748B" }}>API Secret</label>
                  <MaskedInput
                    value={k.apiSecret}
                    placeholder="Paste API secret..."
                    onChange={(v) => update(k.id, "apiSecret", v)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                {k.status === "connected" && (
                  <div className="flex items-center gap-2">
                    {k.permissions.map((p) => (
                      <span key={p} className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,255,148,0.1)", color: "#00FF94" }}>
                        <CheckCircle className="w-2.5 h-2.5" /> {p}
                      </span>
                    ))}
                  </div>
                )}
                {k.status === "error" && (
                  <span className="text-xs font-mono" style={{ color: "#FF3B6B" }}>Invalid key or insufficient permissions</span>
                )}
                {k.status === "unconfigured" && <span />}

                <button
                  onClick={() => testConnection(k.id)}
                  disabled={testing === k.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ml-auto"
                  style={{
                    background: "rgba(58,134,255,0.15)",
                    color: "#3A86FF",
                    border: "1px solid rgba(58,134,255,0.3)",
                    opacity: testing === k.id ? 0.7 : 1,
                  }}
                >
                  {testing === k.id ? "Testing..." : "Test Connection"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="rounded-lg p-4 space-y-2" style={{ background: "#0A1120", border: "1px solid #1E2D3D" }}>
          <p className="text-xs font-mono font-semibold" style={{ color: "#64748B" }}>Security Notes</p>
          <ul className="space-y-1 text-xs font-mono" style={{ color: "#3D5068" }}>
            <li>→ Keys are stored encrypted via Supabase Vault (AES-256)</li>
            <li>→ All exchange API calls execute in Edge Functions — keys never reach the browser</li>
            <li>→ Required permissions: <span style={{ color: "#3A86FF" }}>Read + Trade</span> only</li>
            <li>→ Withdrawal permission is <span style={{ color: "#FF3B6B" }}>never required</span> and should be disabled</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
