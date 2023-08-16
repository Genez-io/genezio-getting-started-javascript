import { TaskService } from "./sdk/taskService.sdk.js";

// We want to persist the todo lists across page reloads.
// For this we use the localStorage API.
// If the user has no token yet, we generate a random one.
let token = localStorage.getItem("apiToken");
if (!token) {
    // generate a random token
    token =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    localStorage.setItem("apiToken", token);
}

// Function that adds a new task
async function handleAdd() {
    document.getElementById("modal-error-elem").innerHTML = "";

    // take taskTitle from the input field with id="task-title-input"
    const taskTitle = document.getElementById("task-title-input").value;

    if (!taskTitle) {
        // show an error message
        document.getElementById("modal-error-elem").innerHTML =
            "Title is mandatory";
        return;
    }

    // create a new task with the title and the token from local storage using the SDK
    TaskService.createTask(token, taskTitle).then((res) => {
      if (res.success) {
        // reload the page
        location.reload();
      }
    });
}

// add an event listener to the button with id="add-task-btn"
document.getElementById("add-task-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    handleAdd();
});

// iterate over all tasks
TaskService.getAllTasksByUser(token).then((res) => {
  if (res.success) {
    // iterate over all tasks
    for (const task of res.tasks) {
      const taskContainer = document.getElementById('tasks');
      const taskTitle = `<span>${task.title}</span>`;
      // Check if the task link is present
      const taskLink = task.url
        ? `at <a href="${task.url}" target="_blank"> ${task.url}</a>`
        : '';

      // add the task to the DOM as pure HTML to a div with id="tasks"
      taskContainer.innerHTML += `
        <div class="mb-3">
          <div class="d-flex align-items-center">
              <input type="checkbox" ${
                task.solved ? 'checked' : ''
              } class="task_checkbox" id=${task.id}>
              <p class="mb-0" style="margin-right: auto; margin-left: 20px">
                ${taskTitle}
                ${taskLink}
              </p>
          </div>
        </div>
       `;
    }
  }

  // add an event listener to all checkboxes
  const checkboxes = document.getElementsByClassName('task_checkbox');
  for (const checkbox of checkboxes) {
    checkbox.addEventListener('change', async (e) => {
      // get the id of the task
      const id = e.target.id;

      // get the task by id
      const task = res.tasks.find((task) => task.id === id);

      // update the task
      await TaskService.updateTask(token, id, task.title, e.target.checked);
    });
  }
});
