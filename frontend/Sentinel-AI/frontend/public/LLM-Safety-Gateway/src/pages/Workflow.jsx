import { ShieldCheck, PlugZap, Eye, Server } from "lucide-react";

function Step({ icon: Icon, title, body }) {
  return (
    <div className="glass glass-hover p-4 flex gap-3 items-start">
      <div className="mt-1">
        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-violet-300" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-[#f5ecff] mb-1">{title}</h3>
        <p className="text-xs text-[#dbc7ff]">{body}</p>
      </div>
    </div>
  );
}

export default function Workflow() {
  return (
    <div className="bg-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <header className="space-y-2">
          <h1 className="section-title">How Sentinel AI works</h1>
          <p className="text-sm text-[#dbc7ff] max-w-2xl">
            Sentinel AI sits between your users and your language models. It
            inspects every prompt, applies safety policies, and forwards only
            the safe requests to your model.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-4">
          <Step
            icon={PlugZap}
            title="1. Drop-in in front of your LLM"
            body="You point your application to the Sentinel AI gateway instead of calling the model endpoint directly. No prompt rewrites or model changes required."
          />
          <Step
            icon={Eye}
            title="2. Inspect every prompt in real time"
            body="Each prompt is parsed and checked against configurable policies: PII, credentials, jailbreak patterns, toxicity, compliance rules, and more."
          />
          <Step
            icon={ShieldCheck}
            title="3. Block or sanitize unsafe content"
            body="If a prompt violates policy, Sentinel AI can block it, ask the user to rephrase, or automatically sanitize sensitive parts before forwarding."
          />
          <Step
            icon={Server}
            title="4. Forward safe prompts to your provider"
            body="Safe prompts are forwarded to any LLM provider (OpenAI, Anthropic, local models, etc.), with latency overhead small enough for production use."
          />
        </section>

        <section className="glass p-4 sm:p-6 text-xs text-[#e4d4ff] space-y-2">
          <p className="font-semibold text-sm">Backend integration summary</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Expose a single HTTPS endpoint as the gateway for all prompts.</li>
            <li>Use API keys or JWTs to authenticate calling services.</li>
            <li>Policies and blocked prompts can be surfaced via REST or WebSocket APIs.</li>
            <li>Metrics flow into this dashboard via a small analytics service.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
