function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.querySelector(".role-btn.active")?.dataset.role;

  console.log("LOGIN TRY:", email, password, role);

  // ===== ADMIN LOGIN =====
  if (role === "admin") {
    if (email === "admin" && password === "admin123") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", "admin");
      window.location.href = "admindashboard.html";
      return;
    } else {
      showError("Invalid admin login!");
      return;
    }
  }

  // ===== USER LOGIN =====
  const user = localStorage.getItem("user_" + email);

  if (!user) {
    showError("User not found!");
    return;
  }

  const parsed = JSON.parse(user);

  if (parsed.password !== password) {
    showError("Wrong password!");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userRole", "user");
  localStorage.setItem("user_email", parsed.email);


  window.location.href = "index.html";
}

function showError(msg) {
  const box = document.getElementById("error-box");
  box.innerText = msg;
  box.style.display = "block";
}
