const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

// load saved tasks or empty array
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// render tasks on start
renderTasks();

// add task when button clicked
document.getElementById("addBtn").addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    renderTasks();
  }
});

// function to render tasks
function renderTasks() {
  list.innerHTML = "";

  // Count incomplete tasks
  let incompleteCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}">${task.text}</span>
      <div>
        <i class="fa-solid fa-circle-check check-icon"></i>
        <i class="fa-solid fa-trash delete-icon"></i>
      </div>
    `;

    const checkIcon = li.querySelector(".check-icon");
    const deleteIcon = li.querySelector(".delete-icon");
    const textSpan = li.querySelector("span");

    // Count only incomplete tasks
    if (!task.done) incompleteCount++;

    // Mark completed style
    if (task.done) {
      li.classList.add("completed");
      checkIcon.classList.add("completed");
      textSpan.classList.add("completed");
    }

    checkIcon.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    deleteIcon.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    list.appendChild(li);
  });

  // Update task counter text
  const countEl = document.getElementById("taskCount");
  countEl.innerText = `${incompleteCount} task${incompleteCount === 1 ? "" : "s"} left`;

  // Show/hide empty state
  const emptyMsgEl = document.getElementById("emptyMsg");
  if (tasks.length === 0) {
    emptyMsgEl.style.display = "block";
  } else {
    emptyMsgEl.style.display = "none";
  }
}
// clear all tasks
clearBtn.addEventListener("click", () => {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
});

