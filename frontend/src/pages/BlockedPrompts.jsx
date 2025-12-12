// src/pages/BlockedPrompts.jsx
import { useEffect, useRef, useState } from "react";
import { fetchBlockedEvents, openBlockedEventsSSE } from "../api/client";

function PromptRow({ item }) {
  return (
    <div className="glass p-3 mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="min-w-0">
        <div className="text-xs text-[#cbb7ff]">{item.ts || item.time}</div>
        <div className="text-sm font-medium truncate">{item.promptSnippet || item.prompt || "(no snippet)"}</div>
        <div className="text-xs text-rose-300 mt-1">Reason: {item.reason || "blocked"}</div>
      </div>
      <div className="text-xs text-[#e4d4ff] sm:text-right">
        <div>Source: {item.source || "gateway"}</div>
        <div className="mt-1">ID: {item.id}</div>
      </div>
    </div>
  );
}

export default function BlockedPrompts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sseConnected, setSseConnected] = useState(false);
  const esRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    fetchBlockedEvents(200)
      .then((res) => {
        if (!mounted) return;
        setItems(res.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("fetchBlockedEvents failed:", err);
        setLoading(false);
      });

    try {
      const es = openBlockedEventsSSE(
        (event) => {
          setItems((prev) => [event, ...prev].slice(0, 500));
        },
        () => setSseConnected(true),
        () => setSseConnected(false)
      );
      esRef.current = es;
    } catch (err) {
      console.warn("SSE open failed:", err);
    }

    return () => {
      mounted = false;
      if (esRef.current) {
        try {
          esRef.current.close();
        } catch (err) {}
      }
    };
  }, []);

  return (
    <div className="bg-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <header>
          <h1 className="section-title">Blocked prompts (live)</h1>
          <p className="text-sm text-[#dbc7ff]">This feeds blocked prompts as they are detected.</p>
          <div className="text-xs text-[#cbb7ff] mt-2">
            SSE status: {sseConnected ? <span className="text-emerald-300">connected</span> : <span className="text-rose-300">disconnected</span>}
          </div>
        </header>

        <section>
          {loading && <div className="glass p-4">Loading recent blocked prompts…</div>}
          {!loading && items.length === 0 && <div className="glass p-4">No blocked prompts yet.</div>}
          <div>
            {items.map((it) => <PromptRow key={it.id || it.ts || Math.random()} item={it} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
