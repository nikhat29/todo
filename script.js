let tasks = [];
let addBtn = document.getElementById("addBtn");
let inputBox = document.getElementById("inputBox");
let taskList = document.getElementById("taskList");

// Tto save tasks in localstorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//To display stored tasks from localstorage
document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      storedTasks.forEach((task) => tasks.push(task));
      updateTaskList();
    }
  });

//To add a new task
const addTask = () => {
  const inputText = inputBox.value.trim();

  if (inputText) {
    tasks.push({ inputText: inputText, completed: false });
    inputBox.value = "";
    updateTaskList();
    checkAllCompletedTasks();
    saveTasks();
  }
};

//To make a task complete by checkbox
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  saveTasks();
  checkAllCompletedTasks();
};

//To delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  saveTasks();
  checkAllCompletedTasks();
};

//To edit a task
const editTask = (index) => {
  const inputBox = document.getElementById("inputBox");
  inputBox.value = tasks[index].inputText;
  tasks.splice(index, 1);
  updateTaskList();
  saveTasks();
  checkAllCompletedTasks();
};

//to check if all tasks are done. If yes then call Confetti effect
const checkAllCompletedTasks = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  if (tasks.length && completedTasks === totalTasks) {
    blastConfetti();
  }
};

//To Update Task List after adding every task
const updateTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          } />
          <p>${task.inputText}</p>
          </div>
          <div class="icons">
          <img src="images/pen.png" alt="edit" onClick="editTask(${index})"/>
          <img src="images/delete.png" alt="delete"onClick ="deleteTask(${index})"/>
          </div>
        </div>`;
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.appendChild(listItem);
  });
};

//Confetti effect code
const blastConfetti = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  });
};

//calling addTask button on click of Add Button
addBtn.addEventListener("click", addTask);
