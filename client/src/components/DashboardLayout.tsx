import { useLocation, Link } from "wouter";
import {
  LayoutDashboard,
  BarChart2,
  Sliders,
  Shield,
  Key,
  BookOpen,
  Activity,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/app", icon: LayoutDashboard, label: "Command Center" },
  { href: "/app/market", icon: BarChart2, label: "Market Lab" },
  { href: "/app/strategy", icon: Sliders, label: "Strategy Studio" },
  { href: "/app/risk", icon: Shield, label: "Risk Console" },
  { href: "/app/vault", icon: Key, label: "Vault" },
  { href: "/app/journal", icon: BookOpen, label: "Journal" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        style={{ background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
        className="w-56 flex-shrink-0 flex flex-col"
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(58,134,255,0.15)", border: "1px solid rgba(58,134,255,0.3)" }}
            >
              <Activity className="w-4 h-4" style={{ color: "#3A86FF" }} />
            </div>
            <span className="font-mono font-bold text-sm tracking-widest text-foreground">
              STIEMFIELD
            </span>
          </div>
          <p className="text-xs mt-1 pl-9" style={{ color: "#3A86FF", fontFamily: "'JetBrains Mono', monospace" }}>
            v1.0 · PAPER
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = href === "/app" ? location === "/app" : location.startsWith(href);
            return (
              <Link key={href} href={href}>
                <a className={`nav-item ${active ? "nav-item-active" : ""}`}>
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{label}</span>
                  {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* Bottom status */}
        <div className="px-3 py-4 border-t border-border/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: "#64748B" }}>AGENT</span>
            <span className="status-paper">
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              PAPER
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono" style={{ color: "#64748B" }}>EXCHANGE</span>
            <span className="text-xs font-mono" style={{ color: "#64748B" }}>—</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
