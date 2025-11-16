# ==========================================================
#  CuratorBot Backend - FastAPI + RAG + Gemini Integration
# ==========================================================

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import traceback

# --- Import local utility functions ---
from utils.retriever import retrieve, rerank_cross_encoder
from utils.prompt_builder import build_gemini_prompt
from utils.gemini_client import call_gemini


# ----------------------------------------------------------
# ✅ 1. Initialize FastAPI app
# ----------------------------------------------------------
app = FastAPI(title="CuratorBot Medical RAG API", version="1.0")


# ----------------------------------------------------------
# ✅ 2. Allow CORS for both local and deployed frontend
# ----------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",             # Local React dev
        "https://curatorbot.vercel.app",     # Deployed frontend (Vercel)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------------------------------------
# ✅ 3. Health check
# ----------------------------------------------------------
@app.get("/")
def home():
    return {"message": "✅ CuratorBot backend is running"}


# ----------------------------------------------------------
# ✅ 4. Handle preflight OPTIONS requests
# ----------------------------------------------------------
@app.options("/ask")
async def options_handler():
    return JSONResponse(status_code=200, content={})


# ----------------------------------------------------------
# ✅ 5. Main /ask endpoint
# ----------------------------------------------------------
@app.post("/ask")
async def ask_medical_question(request: Request):
    try:
        data = await request.json()
        query = data.get("query", "").strip()

        if not query:
            return {
                "answer": {
                    "concise": "⚠️ Please provide a medical question.",
                    "context": "",
                    "resources": [],
                }
            }

        print(f"🟢 Incoming query: {query}")

        # Step 1️⃣ – Retrieve documents
        results = retrieve(query, k=10)
        print(f"📄 Retrieved {len(results)} documents")

        # Step 2️⃣ – Rerank documents
        reranked = rerank_cross_encoder(query, results)
        print(f"🏅 Reranked {len(reranked)} docs")

        # Step 3️⃣ – Build prompt
        prompt = build_gemini_prompt(query, reranked, max_contexts=50)

        # Step 4️⃣ – Call Gemini
        raw_answer = call_gemini(prompt, stream=False)
        print("🧠 Raw Gemini:", raw_answer)

        # Step 5️⃣ – Format clearly
        format_prompt = f"""
        You are a concise medical assistant. Format the answer as:
        1️⃣ Concise Answer: 2–3 lines.
        2️⃣ Context: Explain briefly with medical accuracy.
        Question: {query}
        Base Info: {raw_answer}
        """
        formatted = call_gemini(format_prompt, stream=False)
        if hasattr(formatted, "__iter__") and not isinstance(formatted, str):
            formatted = "".join(formatted)
        print("🧩 Formatted:", formatted)

        # Step 6️⃣ – Parse formatted output
        if formatted and formatted.strip():
            if "2️⃣ Context:" in formatted:
                concise_part, context_part = formatted.split("2️⃣ Context:", 1)
                concise_part = concise_part.replace("1️⃣ Concise Answer:", "").strip()
                context_part = context_part.strip()
            else:
                concise_part = formatted.strip()
                context_part = ""
        else:
            concise_part = "⚠️ Gemini did not return an answer."
            context_part = "Using retrieved data as fallback."

        # Step 7️⃣ – Top sources
        sources = [
            {
                "name": item.get("source", "Unknown"),
                "snippet": item.get("text", "")[:200],
            }
            for item in reranked[:5]
        ]

        # Step 8️⃣ – Return structured JSON
        return {
            "answer": {
                "concise": concise_part,
                "context": context_part,
                "resources": sources,
            }
        }

    except Exception as e:
        print("❌ ERROR:", e)
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"error": str(e), "detail": "Server error while processing."},
        )


# ----------------------------------------------------------
# ✅ 6. Local dev start
# ----------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
