document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const errorMsg = document.getElementById("errorMsg");
    const successMsg = document.getElementById("successMsg");
    const remember = document.getElementById("remember");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        errorMsg.style.display = "none";
        successMsg.style.display = "none";

        const userVal = username.value.trim();
        const passVal = password.value.trim();

        if (!userVal || !passVal) {
            errorMsg.textContent = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.";
            errorMsg.style.display = "block";
            return;
        }

        // ✅ Kiểm tra role
        if (userVal === "admin" && passVal === "admin123") {
            // Lưu role admin
            localStorage.setItem("lib_role", "admin");
            showSuccessAndRedirect("Đăng nhập thành công (Admin).", "admin-dashboard.html");
        } else if (userVal === "user" && passVal === "user123") {
            // Lưu role user
            localStorage.setItem("lib_role", "user");
            showSuccessAndRedirect("Đăng nhập thành công (Người dùng).", "library-dashboard.html");
        } else {
            errorMsg.textContent = "Sai tên đăng nhập hoặc mật khẩu.";
            errorMsg.style.display = "block";
        }

        // nhớ tài khoản
        if (remember.checked) {
            localStorage.setItem("lib_user", userVal);
        } else {
            localStorage.removeItem("lib_user");
        }
    });

    // Hàm hiển thị thành công và chuyển trang
    function showSuccessAndRedirect(msg, url) {
        successMsg.textContent = msg + " Đang chuyển hướng...";
        successMsg.style.display = "block";
        setTimeout(() => {
            window.location.href = url;
        }, 1200);
    }

    // Điền lại username nếu có lưu trước đó
    const saved = localStorage.getItem("lib_user");
    if (saved) {
        username.value = saved;
        remember.checked = true;
    }
});