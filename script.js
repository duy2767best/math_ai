function solveMath() {
    let question = document.getElementById("question").value;
    let resultDiv = document.getElementById("result");
    let image = document.getElementById("geometry-image");

    // Xóa kết quả cũ
    resultDiv.innerHTML = "Đang giải bài toán...";
    image.style.display = "none";

    // Gửi dữ liệu đến server Flask
    fetch("http://127.0.0.1:5000/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question })
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.innerHTML = data.answer;
        if (data.image) {
            image.src = data.image;
            image.style.display = "block";
        }
    })
    .catch(error => {
        resultDiv.innerHTML = "Lỗi khi gửi yêu cầu.";
        console.error("Lỗi:", error);
    });
}
