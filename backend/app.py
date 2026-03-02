from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

books = [
    {"id": 1, "title": "Clean Code", "author": "Robert C. Martin"},
    {"id": 2, "title": "The Pragmatic Programmer", "author": "Andrew Hunt, David Thomas"},
]


@app.get("/api/health")
def health_check():
    return jsonify({"status": "ok"})


@app.get("/api/books")
def list_books():
    return jsonify(books)


@app.post("/api/books")
def create_book():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    author = (data.get("author") or "").strip()

    if not title or not author:
        return jsonify({"error": "Both title and author are required."}), 400

    next_id = max((book["id"] for book in books), default=0) + 1
    new_book = {"id": next_id, "title": title, "author": author}
    books.append(new_book)
    return jsonify(new_book), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
