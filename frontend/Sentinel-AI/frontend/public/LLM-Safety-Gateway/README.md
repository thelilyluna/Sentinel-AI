# 🛡️ SentinelAI — LLM Safety Gateway

SentinelAI is a **multi-layer AI safety gateway** that filters, analyzes, and sanitizes user prompts **before** they reach the LLM.  
It prevents jailbreaks, misuse, and harmful outputs while preserving productivity and valid user queries.

---

## Key Highlights

-  **Multi-Layer Safety Defense**
  - Rule-based filters
  - ML toxicity & intent classifiers
  - OpenAI Safety/Moderation API
  - Vector similarity attack recognition
  - Adaptive attack memory

-  **Real-Time Prompt Sanitization**
  - Unsafe prompts aren’t just blocked — they’re **rewritten into safe alternatives**

-  **Model-Agnostic**
  - Works with OpenAI, Hugging Face, and **local LLMs**

-  **Complete Safety Visibility**
  - Logs risk scores, flags violated policies, monitors usage

Tech Stack:
- **Frontend:** React + Tailwind
- **Backend:** FastAPI (Python)
- **Safety Engine:** HuggingFace models + OpenAI moderation + Vector DB
- **LLM Layer:** Any model (OpenAI-compatible by default)

  View the website here- https://sentine.netlify.app/


