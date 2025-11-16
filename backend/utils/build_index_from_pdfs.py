import os
import faiss
import pickle
import numpy as np
import fitz  # PyMuPDF
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

# Folder containing your PDFs
PDF_DIR = r"C:\Users\Valarmathi\HackACure-Dataset\Dataset"
OUTPUT_DIR = "data"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Load embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

def extract_text_from_pdf(pdf_path):
    """Extract all text from a PDF file."""
    text = ""
    with fitz.open(pdf_path) as doc:
        for page in doc:
            text += page.get_text("text") + "\n"
    return text

def chunk_text(text, chunk_size=500, overlap=50):
    """Split long text into smaller overlapping chunks."""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

# Collect documents
documents = []
sources = []

for pdf_file in tqdm(os.listdir(PDF_DIR), desc="Processing PDFs"):
    if pdf_file.endswith(".pdf"):
        path = os.path.join(PDF_DIR, pdf_file)
        text = extract_text_from_pdf(path)
        chunks = chunk_text(text)
        documents.extend(chunks)
        sources.extend([pdf_file] * len(chunks))

# Generate embeddings
print("Generating embeddings...")
embeddings = model.encode(documents, show_progress_bar=True)

# Create FAISS index
dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(np.array(embeddings))

# Save index and metadata
faiss.write_index(index, os.path.join(OUTPUT_DIR, "faiss.index"))

metadata = [{"source": src, "text": doc} for src, doc in zip(sources, documents)]
with open(os.path.join(OUTPUT_DIR, "metadata.pkl"), "wb") as f:
    pickle.dump(metadata, f)

print(f"✅ FAISS index and metadata saved to '{OUTPUT_DIR}/'")
