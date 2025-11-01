# utils/prompt_builder.py
def build_gemini_prompt(query, top_contexts, max_contexts=100, instruction=None):
    """
    Build a context-rich prompt for Gemini with more text coverage.
    """
    context_strs = []
    for i, item in enumerate(top_contexts[:max_contexts], 1):
        src = item.get("source", "Unknown source")
        snippet = item.get("text", item.get("answer", "[No text available]")).strip()
        context_strs.append(f"Context {i} (from {src}):\n{snippet}")

    context_block = "\n\n".join(context_strs)

    default_instruction = (
        "You are a reliable medical assistant. Use the information provided to answer "
        "accurately and concisely. If you can't find a clear answer, say exactly: "
        "'Not found in context.'"
    )

    prompt = f"{instruction or default_instruction}\n\n=== Context Information ===\n{context_block}\n\n=== User Question ===\n{query}\n\n=== Your Answer ==="
    return prompt.strip()
