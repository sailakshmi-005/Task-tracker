const API = "http://localhost:5000/api/tasks";
const token = localStorage.getItem("token");

let allTasks = [];
let currentFilter = "all";

window.onload = fetchTasks;

// ---------------- FETCH TASKS ----------------
function fetchTasks() {
  fetch(API, {
    headers: {
      Authorization: token
    }
  })
    .then(res => res.json())
    .then(data => {
      allTasks = data;
      updateStats();
      renderTasks();
    });
}

// ---------------- RENDER TASKS ----------------
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = allTasks;

  if (currentFilter === "active") {
    filtered = allTasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filtered = allTasks.filter(t => t.completed);
  }

  filtered.forEach(task => {
    let color = "green";
    if (task.priority === "high") color = "red";
    else if (task.priority === "medium") color = "orange";

    list.innerHTML += `
      <div class="task-box" style="border-left:6px solid ${color}">

        <div>
          <input type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleComplete('${task._id}', ${task.completed})">

          <span style="text-decoration:${task.completed ? "line-through" : "none"}">
            ${task.title}
          </span>

          <br>

          <small>📅 ${task.dueDate ? new Date(task.dueDate).toLocaleString() : "No Date"}</small>
          <br>
          <small>⚡ ${task.priority}</small>
        </div>

        <div class="btn-group">
          <button onclick="editTask('${task._id}', '${task.title}')">Edit</button>
          <button onclick="deleteTask('${task._id}')">Delete</button>
        </div>

      </div>
    `;
  });
}

// ---------------- STATS ----------------
function updateStats() {
  document.getElementById("totalTasks").innerText = allTasks.length;
  document.getElementById("completedTasks").innerText =
    allTasks.filter(t => t.completed).length;
  document.getElementById("pendingTasks").innerText =
    allTasks.filter(t => !t.completed).length;
}

// ---------------- FILTER ----------------
function setFilter(type) {
  currentFilter = type;
  renderTasks();
}

// ---------------- ADD TASK ----------------
function addTask() {
  const title = document.getElementById("taskTitle").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title, dueDate, priority })
  }).then(() => {
    document.getElementById("taskTitle").value = "";
    document.getElementById("dueDate").value = "";
    fetchTasks();
  });
}

// ---------------- TOGGLE ----------------
function toggleComplete(id, status) {
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ completed: !status })
  }).then(() => fetchTasks());
}

// ---------------- DELETE ----------------
function deleteTask(id) {
  fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: token }
  }).then(() => fetchTasks());
}

// ---------------- EDIT ----------------
function editTask(id, title) {
  const newTitle = prompt("Edit task:", title);
  if (!newTitle) return;

  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ title: newTitle })
  }).then(() => fetchTasks());
}

// ---------------- LOGOUT ----------------
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
