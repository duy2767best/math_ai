from flask import Flask, request, jsonify
import sympy as sp

app = Flask(__name__)

def solve_math(expression):
    try:
        result = sp.sympify(expression).evalf()
        return str(result)
    except Exception as e:
        return f"Lỗi: {str(e)}"

@app.route("/solve", methods=["POST"])
def solve():
    data = request.json
    expression = data.get("expression", "")
    return jsonify({"result": solve_math(expression)})
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)