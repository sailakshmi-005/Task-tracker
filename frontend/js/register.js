console.log("register.js loaded");

async function register() {
  try {
    console.log("Register button clicked");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // basic validation
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
      alert("Registration successful");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registration failed");
    }

  } catch (err) {
    console.log("ERROR:", err);
    alert("Server not reachable. Check backend.");
  }
}
