// src/api/client.js
import axios from "axios";

/**
 * Frontend API client with MOCK mode.
 *
 * - Set VITE_USE_MOCK=true in .env to use the mock implementation (no backend needed).
 * - When ready to integrate, set VITE_USE_MOCK=false and set VITE_API_BASE_URL accordingly.
 */

const USE_MOCK = (import.meta.env.VITE_USE_MOCK || "true") === "true";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

/* ----------------------
   MOCK IMPLEMENTATION
   ---------------------- */
function createMockClient() {
  // in-memory mock state
  let nextId = 1000;
  let mockEvents = [
    {
      id: nextId++,
      ts: new Date().toISOString(),
      promptSnippet: "Attempt: give me someone's ssn",
      reason: "Matched rule: ssn",
      source: "mock",
    },
    {
      id: nextId++,
      ts: new Date().toISOString(),
      promptSnippet: "Please create malware to break into a router",
      reason: "Matched rule: malware",
      source: "mock",
    },
  ];

  // SSE simulator: calls onEvent every few seconds
  function openBlockedEventsSSE(onEvent, onOpen = null, onError = null) {
    // call onOpen quickly
    setTimeout(() => onOpen && onOpen(), 100);

    // periodic new event generator
    const interval = setInterval(() => {
      const ev = {
        id: nextId++,
        ts: new Date().toISOString(),
        promptSnippet: `Simulated blocked prompt #${nextId}`,
        reason: ["PII", "jailbreak", "malware"][Math.floor(Math.random() * 3)],
        source: "simulator",
      };
      mockEvents.unshift(ev);
      if (mockEvents.length > 500) mockEvents.pop();
      try {
        onEvent(ev);
      } catch (err) {
        console.error("mock sse onEvent error", err);
      }
    }, 3000);

    // return an object with close()
    return {
      close: () => clearInterval(interval),
    };
  }

  async function fetchBlockedEvents(limit = 100) {
    return { items: mockEvents.slice(0, Math.min(limit, mockEvents.length)) };
  }

  async function checkPrompt(promptText) {
    // naive mock rules
    const lowered = (promptText || "").toLowerCase();
    const blockedPatterns = ["ssn", "social security", "credit card", "password", "explode", "bomb", "malware"];
    const matched = blockedPatterns.find((p) => lowered.includes(p));
    if (matched) {
      const reason = `Matched mock pattern: ${matched}`;
      const ev = {
        id: nextId++,
        ts: new Date().toISOString(),
        promptSnippet: promptText.slice(0, 400),
        reason,
        source: "tester-mock",
      };
      mockEvents.unshift(ev);
      return { allowed: false, reason, details: { matched } };
    }
    return { allowed: true };
  }

  return {
    fetchBlockedEvents,
    openBlockedEventsSSE,
    checkPrompt,
  };
}

/* ----------------------
   REAL IMPLEMENTATION
   ---------------------- */

function createRealClient() {
  async function fetchBlockedEvents(limit = 100) {
    const res = await api.get("/events/blocked", { params: { limit } });
    return res.data; // expected { items: [...] }
  }

  function openBlockedEventsSSE(onEvent, onOpen = null, onError = null) {
    const url = `${baseURL.replace(/\/$/, "")}/events/stream`;
    const es = new EventSource(url);

    es.onopen = () => onOpen && onOpen();
    es.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        onEvent(data);
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };
    es.onerror = (err) => {
      onError && onError(err);
      console.error("SSE error", err);
    };
    return es; // EventSource has .close()
  }

  async function checkPrompt(promptText) {
    const res = await api.post("/prompts/check", { prompt: promptText });
    return res.data;
  }

  return {
    fetchBlockedEvents,
    openBlockedEventsSSE,
    checkPrompt,
  };
}

/* ----------------------
   EXPORT CHOSEN CLIENT
   ---------------------- */

const impl = USE_MOCK ? createMockClient() : createRealClient();

export const fetchBlockedEvents = impl.fetchBlockedEvents;
export const openBlockedEventsSSE = impl.openBlockedEventsSSE;
export const checkPrompt = impl.checkPrompt;
