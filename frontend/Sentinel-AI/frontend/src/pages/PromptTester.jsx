// src/pages/PromptTester.jsx
import { useState } from "react";
import { checkPrompt } from "../api/client";

export default function PromptTester() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e?.preventDefault();
    setError("");
    setResult(null);
    if (!prompt.trim()) {
      setError("Please enter a prompt to test.");
      return;
    }
    try {
      setLoading(true);
      const res = await checkPrompt(prompt.trim());
      setResult(res);
    } catch (err) {
      console.error(err);
      setError("Request failed. Check backend or network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="section-title">Prompt tester</h1>
        <p className="text-sm text-[#dbc7ff] mb-4">Submit a prompt and the gateway will indicate whether it would be allowed or blocked.</p>

        <form onSubmit={submit} className="glass p-4 space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            placeholder="Enter a prompt to test..."
            className="w-full bg-transparent text-white placeholder:text-slate-300 outline-none p-2"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow"
              disabled={loading}
            >
              {loading ? "Checking…" : "Check prompt"}
            </button>

            <button
              type="button"
              onClick={() => { setPrompt(""); setResult(null); setError(""); }}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/90"
            >
              Clear
            </button>
          </div>

          {error && <div className="text-rose-300 text-sm">{error}</div>}

          {result && (
            <div className={`p-3 rounded-md ${result.allowed ? "bg-emerald-900/40" : "bg-rose-900/40"}`}>
              <div className="font-semibold">{result.allowed ? "Allowed" : "Blocked"}</div>
              {result.reason && <div className="text-sm text-[#e4d4ff] mt-1">Reason: {result.reason}</div>}
              {result.details && <pre className="text-xs mt-2 p-2 bg-black/20 rounded">{JSON.stringify(result.details, null, 2)}</pre>}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
