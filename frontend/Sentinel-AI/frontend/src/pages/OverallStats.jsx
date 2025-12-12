import "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = {
  labels,
  datasets: [
    {
      label: "Total prompts",
      data: [20000, 23500, 21800, 26000, 28000, 24000, 25000],
      borderColor: "rgba(129,140,248,1)",
      backgroundColor: "rgba(129,140,248,0.2)",
      tension: 0.4,
      fill: true,
      pointRadius: 3,
    },
    {
      label: "Blocked prompts",
      data: [320, 410, 390, 520, 610, 470, 550],
      borderColor: "rgba(248,113,113,1)",
      backgroundColor: "rgba(248,113,113,0.16)",
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

export default function OverallStats() {
  return (
    <div className="bg-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="space-y-2">
          <h1 className="section-title">Overall safety performance</h1>
          <p className="text-sm text-[#dbc7ff] max-w-2xl">
            Aggregate metrics across the last 7 days, showing how Sentinel AI is
            protecting your models over time.
          </p>
        </header>

        <section className="grid sm:grid-cols-3 gap-4">
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Total prompts</p>
            <p className="text-2xl font-bold">173,600</p>
          </div>
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Total blocked</p>
            <p className="text-2xl font-bold text-rose-300">3,271</p>
          </div>
          <div className="glass p-4">
            <p className="text-xs text-[#cbb7ff] mb-1">Top blocked category</p>
            <p className="text-lg font-bold">PII & credentials</p>
          </div>
        </section>

        <section className="glass p-4 sm:p-6">
          <h2 className="text-sm font-semibold mb-4 text-[#f5ecff]">
            Prompts vs blocked over the last week
          </h2>
          <div className="h-64">
            <Line data={data} options={options} />
          </div>
        </section>
      </div>
    </div>
  );
}
