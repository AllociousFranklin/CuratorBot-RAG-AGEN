from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.retriever import retrieve, rerank_cross_encoder
from utils.prompt_builder import build_gemini_prompt
from utils.gemini_client import call_gemini

# ✅ Create FastAPI app
app = FastAPI()

# ✅ Enable CORS for frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for local dev; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Backend API running ✅"}


@app.options("/ask")
async def options_handler():
    """Handle browser preflight (CORS OPTIONS) requests."""
    return {}


@app.post("/ask")
async def ask_medical_question(request: Request):
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

    # Step 1: Retrieve and rerank
    results = retrieve(query, k=10)
    reranked = rerank_cross_encoder(query, results)

    # Step 2: Build prompt
    prompt = build_gemini_prompt(query, reranked, max_contexts=50)

    # Step 3: Call Gemini for raw answer
    raw_answer = call_gemini(prompt, stream=False)
    print("🧠 Raw Gemini Answer:", raw_answer)  # 🧠 Debug print

    # Step 4: Ask Gemini to format the output clearly
    format_prompt = f"""
    You are a concise medical assistant. Format the answer as:
    1️⃣ Concise Answer: 2–3 lines summary.
    2️⃣ Context: Explanation in more depth.
    Use only medically accurate info.
    Question: {query}
    Base Info: {raw_answer}
    """

    response = call_gemini(format_prompt, stream=False)
    formatted = (
        "".join(response)
        if hasattr(response, "__iter__") and not isinstance(response, str)
        else response
    )

    print("🧩 Formatted Gemini Response:", formatted)  # 🧩 Debug print

    # Step 5: Prepare fallback logic if Gemini fails
    if formatted and formatted.strip():
        if "2️⃣ Context:" in formatted:
            parts = formatted.split("2️⃣ Context:")
            concise_part = parts[0].replace("1️⃣ Concise Answer:", "").strip()
            context_part = parts[1].strip()
        else:
            concise_part = formatted.strip()
            context_part = ""
    else:
        concise_part = "⚠️ Gemini did not return an answer."
        context_part = (
            "Using retrieved medical data as fallback for context."
        )

    # Step 6: Prepare resource list
    sources = [
        {"name": item.get("source", "Unknown"), "snippet": item.get("text", "")[:180]}
        for item in reranked[:5]
    ]

    # Step 7: Return structured JSON response
    return {
        "answer": {
            "concise": concise_part,
            "context": context_part,
            "resources": sources,
        }
    }
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# Serve frontend build folder (React)
frontend_dir = os.path.join(os.path.dirname(__file__), "frontend", "build")
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        index_file = os.path.join(frontend_dir, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"error": "index.html not found"}
else:
    print("⚠️ Run 'npm run build' inside frontend/ before deploying!")
