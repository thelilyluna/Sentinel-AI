import { Link } from "react-router-dom";
import { Activity, ShieldCheck, AlertTriangle, BarChart3 } from "lucide-react";

function StatCard({ icon: Icon, title, value, subtitle }) {
  return (
    <div className="glass glass-hover p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-violet-300" />
        </div>
        <h3 className="text-sm font-semibold text-[#f5ecff]">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-[#cbb7ff]">{subtitle}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        {/* HERO */}
        <section className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase text-violet-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live safety gateway for LLMs
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              See every prompt.
              <br />
              <span className="text-violet-300">Block the dangerous ones.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#dbc7ff] max-w-xl">
              Sentinel AI sits in front of your language models, watches every
              prompt in real time, and quietly blocks the ones that should never
              reach your model.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/today"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.7)] hover:opacity-95 transition"
              >
                <Activity className="h-4 w-4" />
                View live traffic
              </Link>
              <Link
                to="/workflow"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/60 bg-white/5 px-4 py-2 text-sm font-semibold text-violet-100 hover:bg-white/10 transition"
              >
                <ShieldCheck className="h-4 w-4" />
                How Sentinel AI works
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-[#cbb7ff]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Zero model changes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                <span>Plugs into any provider</span>
              </div>
            </div>
          </div>

          {/* RIGHT HERO CARD */}
          <div className="glass p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#f5ecff]">
                Today&apos;s safety snapshot
              </h2>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-medium text-emerald-300">
                Live
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[#cbb7ff] mb-1">Prompts inspected</p>
                <p className="text-lg font-bold">4,320</p>
              </div>
              <div>
                <p className="text-[#cbb7ff] mb-1">Blocked attempts</p>
                <p className="text-lg font-bold text-rose-300">87</p>
              </div>
              <div>
                <p className="text-[#cbb7ff] mb-1">Avg. latency overhead</p>
                <p className="text-lg font-bold">~12ms</p>
              </div>
              <div>
                <p className="text-[#cbb7ff] mb-1">Policies enforced</p>
                <p className="text-lg font-bold">21</p>
              </div>
            </div>

            <div className="mt-2 space-y-1 text-xs text-[#e4d4ff]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-rose-300" />
                <span>PII exfiltration blocked 12 times in the last hour.</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-3 w-3 text-sky-300" />
                <span>Prompt volume is 18% higher than yesterday.</span>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK STATS GRID */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Activity}
            title="Requests / min"
            value="35"
            subtitle="Current average across all tenants."
          />
          <StatCard
            icon={ShieldCheck}
            title="Blocked today"
            value="87"
            subtitle="Total unsafe prompts stopped."
          />
          <StatCard
            icon={BarChart3}
            title="Top risk category"
            value="PII & credentials"
            subtitle="Most common blocked pattern today."
          />
          <StatCard
            icon={AlertTriangle}
            title="Incidents escalated"
            value="5"
            subtitle="Forwarded to human review."
          />
        </section>
      </div>
    </div>
  );
}
