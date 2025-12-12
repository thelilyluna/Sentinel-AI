import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Home as HomeIcon,
  Activity,
  BarChart3,
  GitBranch,
  Moon,
  Sun,
} from "lucide-react";

import Home from "./pages/Home";
import TodayStats from "./pages/TodayStats";
import OverallStats from "./pages/OverallStats";
import Workflow from "./pages/Workflow";
import BlockedPrompts from "./pages/BlockedPrompts";
import PromptTester from "./pages/PromptTester";

/* ---------- THEME HOOK ---------- */

function useTheme() {
  const [theme, setTheme] = useState("dark");

  // On first mount: read localStorage or system preference
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Whenever theme changes: set data attribute + store it
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, toggle };
}

/* ---------- PAGE TRANSITIONS ---------- */

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/today"
            element={
              <PageTransition>
                <TodayStats />
              </PageTransition>
            }
          />
          <Route
            path="/overall"
            element={
              <PageTransition>
                <OverallStats />
              </PageTransition>
            }
          />
          <Route
            path="/workflow"
            element={
              <PageTransition>
                <Workflow />
              </PageTransition>
            }
          />

          {/* NEW: Blocked prompts (live) */}
          <Route
            path="/blocked"
            element={
              <PageTransition>
                <BlockedPrompts />
              </PageTransition>
            }
          />

          {/* NEW: Prompt tester */}
          <Route
            path="/tester"
            element={
              <PageTransition>
                <PromptTester />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

/* ---------- MAIN APP ---------- */

function App() {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header theme={theme.theme} toggleTheme={theme.toggle} />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

/* ---------- NAVBAR (like reference) ---------- */

const navItems = [
  { to: "/", label: "Home", icon: HomeIcon, end: true },
  { to: "/today", label: "Live Traffic", icon: Activity },
  { to: "/overall", label: "Overall Stats", icon: BarChart3 },
  { to: "/workflow", label: "Workflow", icon: GitBranch },

  // <<--- ADDED NAV ITEMS
  { to: "/blocked", label: "Blocked", icon: Activity },
  { to: "/tester", label: "Tester", icon: BarChart3 },
];

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  const baseLink =
    "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-colors duration-200";
  const activeClasses =
    "bg-white text-[#3c0044] shadow-[0_0_16px_rgba(255,255,255,0.35)]";
  const inactiveClasses =
    "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <header className="sticky top-0 z-40 border-b border-[#5b0c6f] bg-[#3c0044]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* left: logo + title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 flex items-center justify-center shadow-[0_0_20px_rgba(216,180,254,0.7)]">
            <span className="text-xl leading-none text-[#3c0044] font-black">
              ✺
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold tracking-wide text-white">
              Sentinel&nbsp;AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.26em] text-white/70">
              llm safety gateway
            </span>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* theme toggle */}
        <button
          onClick={toggleTheme}
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? (
            <>
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </>
          )}
        </button>

        {/* mobile: theme + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white"
          >
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-[3px]">
              <span className="block h-[2px] w-4 bg-white" />
              <span className="block h-[2px] w-4 bg-white" />
              <span className="block h-[2px] w-4 bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#5b0c6f] bg-[#3c0044]"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `${baseLink} ${
                      isActive ? activeClasses : "text-white/90 hover:bg-white/10"
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default App;
