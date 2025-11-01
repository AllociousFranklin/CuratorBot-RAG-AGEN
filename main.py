from utils.retriever import retrieve, rerank_cross_encoder
from utils.prompt_builder import build_gemini_prompt
from utils.retriever import print_retrieved_oneliners
from utils.gemini_client import call_gemini, get_truncated_gemini_answer


def main():
    # Example sample queries
    sample_queries = [
        "What is keratoderma with woolly hair?",
        "Is keratoderma with woolly hair inherited?",
        "What are the treatments for keratoderma with woolly hair?"
    ]

    print("\nSample queries:")
    for i, q in enumerate(sample_queries, 1):
        print(f"  {i}. {q}")

    try:
        query = input("\nEnter your medical question (or press Enter to use sample 1): ").strip()
        if not query:
            query = sample_queries[0]
    except EOFError:
        print("No input detected. Using default sample query 1.")
        query = sample_queries[0]

    top_k = 20  # Retrieve more documents initially

    # === Step 1: Retrieve candidates ===
    results = retrieve(query, k=top_k)
    print("\nRetrieved Documents (top 3):")
    for i, doc in enumerate(results[:3], 1):
        source = doc.get("source", "Unknown source")
        text_snippet = doc.get("text", "")[:200].replace("\n", " ")
        print(f"{i}. Source: {source}")
        print(f"   Snippet: {text_snippet}...\n")

    # === Step 2: Rerank candidates ===
    reranked = rerank_cross_encoder(query, results)

    # === Step 3: Build Gemini prompt (with expanded context) ===
    gemini_prompt = build_gemini_prompt(query, reranked, max_contexts=100)

    # === Step 4: Call Gemini and stream the answer ===
    print("\n--- Gemini LLM Answer (truncated) ---\n")
    answer = call_gemini(gemini_prompt, stream=True)
    truncated_answer = get_truncated_gemini_answer(answer, max_words=100)
    print(truncated_answer)

    # === Step 5: Print context sources ===
    print("\nSources:")
    for i, item in enumerate(reranked[:5], 1):
        src = item.get("source") or item.get("url") or "Unknown source"
        snippet = item.get("text", item.get("question", ""))[:80].replace("\n", " ")
        print(f"{i}. {src}")
        print(f"   {snippet}...\n")


if __name__ == "__main__":
    main()
