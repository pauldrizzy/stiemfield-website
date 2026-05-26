import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import CommandCenter from "./pages/CommandCenter";
import MarketLab from "./pages/MarketLab";
import StrategyStudio from "./pages/StrategyStudio";
import RiskConsole from "./pages/RiskConsole";
import Vault from "./pages/Vault";
import Journal from "./pages/Journal";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/case-studies"} component={CaseStudies} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/insights"} component={Insights} />
      {/* Trading Agent Dashboard */}
      <Route path={"/app"} component={CommandCenter} />
      <Route path={"/app/market"} component={MarketLab} />
      <Route path={"/app/strategy"} component={StrategyStudio} />
      <Route path={"/app/risk"} component={RiskConsole} />
      <Route path={"/app/vault"} component={Vault} />
      <Route path={"/app/journal"} component={Journal} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
