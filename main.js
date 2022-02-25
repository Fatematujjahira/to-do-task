function getId(id) {
  return document.getElementById(id);
}

const newTaskInp = getId("taskName");
const addBtn = getId("addNewTask");
const taskList = getId("task_list");

//add task

newTaskInp.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && !e.target.value) {
    alert("Please, add a task or write somthing and click add task");
    return;
  } else if (e.key == "Enter" && e.target.value) {
    addNewTask(e.target.value);
    newTaskInp.value = "";
  }
});

addBtn.addEventListener("click", function (e) {
  let taskName = newTaskInp.value;
  if (taskName === "") {
    alert("Please, add a task or write somthing and click add task");
    return;
  }
  newTaskInp.value = "";
  addNewTask(taskName);
});

function addNewTask(taskName) {
  const newTaskItem = document.createElement("div");
  newTaskItem.className = "item";
  newTaskItem.innerHTML = `<li>${taskName}</li>
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>
  </div>`;
  taskList.appendChild(newTaskItem);

  // add new task data in local storage
  const data = getDataFromLocalStorage();
  let anotherData = taskName;
  for (let dataName of data) {
    if (dataName.trim() === taskName) {
      anotherData += " ";
    }
  }
  data.push(anotherData);
  setDataInLocalStorage(data);
}

taskList.addEventListener("click", function (event) {
  if (event.target.className == "deleted") {
    deleteTask(event);
    // console.log("Task Deleted......");
  } else if (event.target.className == "completed") {
    completedTask(event);
    // console.log("Task Done......");
  } else if (event.target.className == "edit") {
    editTaskName(event);
    // console.log("Task Eidted......");
  }
});

function deleteTask(event) {
  event.target.parentElement.remove();
  const taskName = event.target.parentElement.children[0].innerText;
  deleteDataFromLocalStorage(taskName);
}

//--complect function--

function completedTask(event) {
  const taskName = event.target.parentElement.children[0];
  taskName.classList.toggle("completed_task");
}

// edit function

function editTaskName(event) {
  const taskName = event.target.parentElement.children[0];
  const previousName = taskName.innerText;
  taskName.innerHTML = "";
  const inputNewName = document.createElement("input");
  inputNewName.type = "text";
  inputNewName.value = previousName;

  inputNewName.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      const newTaskName = e.target.value;
      taskName.innerText = newTaskName;
      event.target.style.display = "inline";
    }
  });

  taskName.appendChild(inputNewName);
  event.target.style.display = "none";
}

document.body.onload = function (e) {
  const data = getDataFromLocalStorage();
  displayTaskOnUI(data);
};

// get data
function getDataFromLocalStorage() {
  let task;
  const data = localStorage.getItem("tasks");
  if (data) {
    task = JSON.parse(data);
  } else {
    task = [];
  }
  return task;
}
// ----------------------------
// -------------------
function displayTaskOnUI(data) {
  data.forEach((task) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
  <li>${task}</li>
  <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
  <button class="completed"><i class="fas fa-check"></i></button>
  <button class="deleted"><i class="fas fa-trash-can"></i></button>
`;
    taskList.appendChild(item);
  });
}

function setDataInLocalStorage(data) {
  localStorage.setItem("tasks", JSON.stringify(data));
}

// delete data

function deleteDataFromLocalStorage(data) {
  const tasksData = getDataFromLocalStorage();
  const dataIndex = tasksData.indexOf(data);
  tasksData.splice(dataIndex, 1);
  setDataInLocalStorage(tasksData);
}
