import { TaskService } from "@genezio-sdk/getting-started-genezio-javascript_us-east-1";

const DELETE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#DC3545" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>`;

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
    if (!res.success) {
      alert( `Unexpected error: ${
        res.err
          ? res.err
          : "Please check the backend logs in the project dashboard - https://app.genez.io."
      }`);
      return;
    }
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
  if (!res.success) {
    alert( `Unexpected error: ${
      res.err
        ? res.err
        : "Please check the backend logs in the project dashboard - https://app.genez.io."
    }`);
    return;
  }
  if (res.success) {
    // iterate over all tasks
    for (const task of res.tasks) {
      const taskContainer = document.getElementById('tasks');
      const taskTitle = `<span>${task.title}</span>`;
      // Check if the task link is present
      const taskLink = task.url
        ? `at <a href="${task.url}" target="_blank"> ${task.url}</a>`
        : '';
      const taskSolved = task.solved ? 'checked' : '';

      console.log("here")
      // TODO - Genezio Challenge
      // Implement the functionality for the delete button
      // `onclick` should call the TaskServive.deleteTask(token, id) method from the generated SDK
      const deleteButton = `<button class="btn" onclick="">${DELETE_ICON}</button>`

      taskContainer.innerHTML += `
        <div class="mb-3">
          <div class="d-flex align-items-center">
            <input type="checkbox" ${taskSolved} class="task_checkbox" id=${task.id}>
            <p class="mb-0" style="margin-right: auto; margin-left: 20px">
              ${taskTitle}
              ${taskLink}
            </p>
            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="Check out genezio challenge">
              ${deleteButton}
            </span>
          </div>
        </div>`;
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
      await TaskService.updateTask(token, id, task.title, e.target.checked).then((res) => {
        if (!res.success) {
          alert( `Unexpected error: ${
            res.err
              ? res.err
              : "Please check the backend logs in the project dashboard - https://app.genez.io."
          }`);
          return;
        }
      });
    });
  }
});
