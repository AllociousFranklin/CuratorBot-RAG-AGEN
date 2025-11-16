import google.generativeai as genai

def call_gemini(prompt, stream=False, model_name=None):
    """
    Calls Gemini LLM with the given prompt — no .env file needed.
    Hardcoded API key for local testing only.
    """
    # ⚠️ Replace this key with your actual Gemini API key
    api_key = "AIzaSyALll6ZZBZiysguTZTeetm6p6rW8rq5hqE"

    if not api_key or not api_key.startswith("AIza"):
        return "⚠️ Invalid or missing Gemini API key."

    genai.configure(api_key=api_key)

    # ✅ Choose a reliable model
    if not model_name:
        model_name = "models/gemini-2.5-pro"

    try:
        model = genai.GenerativeModel(model_name)

        if stream:
            response = model.generate_content(prompt, stream=True)
            return "".join(chunk.text for chunk in response if hasattr(chunk, "text"))
        else:
            response = model.generate_content(prompt)
            return response.text.strip() if hasattr(response, "text") else "⚠️ Empty response."
    except Exception as e:
        print("❌ Gemini API Error:", e)
        return f"⚠️ Gemini call failed: {e}"


def get_truncated_gemini_answer(chunk_generator, max_words=40):
    """
    Truncates streamed Gemini response to a limited number of words.
    """
    words = []
    for chunk in chunk_generator:
        for word in chunk.split():
            words.append(word)
            if len(words) >= max_words:
                return " ".join(words) + "..."
    return " ".join(words)
