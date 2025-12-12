import "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25"];

const data = {
  labels,
  datasets: [
    {
      label: "Requests / min",
      data: [22, 34, 28, 40, 37, 33],
      borderColor: "rgba(216,180,254,1)",
      backgroundColor: "rgba(216,180,254,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
    {
      label: "Blocked / min",
      data: [1, 3, 2, 5, 4, 3],
      borderColor: "rgba(248,113,113,1)",
      backgroundColor: "rgba(248,113,113,0.15)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: "#eae0ff",
      },
    },
  },
  scales: {
    x: {
      ticks: { color: "#cbb7ff" },
      grid: { color: "rgba(148, 163, 184, 0.2)" },
    },
    y: {
      ticks: { color: "#cbb7ff" },
      grid: { color: "rgba(148, 163, 184, 0.2)" },
    },
  },
};

export default function TodayStats() {
  return (
    <div className="bg-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="space-y-2">
          <h1 className="section-title">Today&apos;s traffic</h1>
          <p className="text-sm text-[#dbc7ff] max-w-2xl">
            Live view of how Sentinel AI is inspecting prompts and blocking
            unsafe attempts for the current day.
          </p>
        </header>

        <section className="grid sm:grid-cols-3 gap-4">
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Prompts inspected</p>
            <p className="text-2xl font-bold">4,320</p>
          </div>
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Blocked prompts</p>
            <p className="text-2xl font-bold text-rose-300">87</p>
          </div>
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Avg latency overhead</p>
            <p className="text-2xl font-bold">12ms</p>
          </div>
        </section>

        <section className="glass p-4 sm:p-6">
          <h2 className="text-sm font-semibold mb-4 text-[#f5ecff]">
            Requests vs blocked prompts (last 30 minutes)
          </h2>
          <div className="h-64">
            <Line data={data} options={options} />
          </div>
        </section>
      </div>
    </div>
  );
}
