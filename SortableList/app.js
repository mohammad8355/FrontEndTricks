// Script.js
const AddBtnEl = document.querySelector("#AddBtn");
const sortableList = document.getElementById("sortable");
const valueInput = document.querySelector("#valueInput");
function Alert(message, type = "danger") {
  const alertBox = document.createElement("div");
  alertBox.innerHTML = message;
  alertBox.classList.add(`alertBox`);
  alertBox.classList.add(type);
  document.querySelector(".alertBoxContainer").appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}
function addListItem() {
  if (valueInput.value.length > 0) {
    const items = sortableList.childNodes;
    for (let child of items) {
      if (child.textContent?.replace("X", "").trim() === valueInput.value) {
        Alert("your input value is exit please try new word", "danger");
        valueInput.value = "";
        return;
      }
    }
    const element = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("DeleteBtn");
    deleteBtn.innerHTML = "X";
    element.innerHTML = valueInput.value;
    element.draggable = true;
    element.appendChild(deleteBtn);
    sortableList.appendChild(element);
    Alert("ُsuccessFull Adding Item", "success");
  } else {
    Alert("please fill the input ");
  }
}
sortableList.addEventListener("click", (e) => {
  if (e.target.classList.contains("DeleteBtn")) {
    e.target.parentElement.remove();
  }
});
AddBtnEl.addEventListener("click", addListItem);
document.addEventListener("keydown", (e) => {
  if (e.code === "Enter") addListItem();
});
let draggedItem = null;
let LastDraggItem = null;
sortableList.addEventListener("dragstart", (e) => {
  LastDraggItem?.classList.remove("active");
  draggedItem = e.target;
  LastDraggItem = e.target;
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
});

sortableList.addEventListener("dragend", (e) => {
  setTimeout(() => {
    e.target.style.display = "";
    LastDraggItem?.classList.add("active");
    draggedItem = null;
  }, 0);
});

sortableList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(sortableList, e.clientY);
  const currentElement = document.querySelector(".dragging");
  if (afterElement == null) {
    sortableList.appendChild(draggedItem);
  } else {
    sortableList.insertBefore(draggedItem, afterElement);
  }
});

const getDragAfterElement = (container, y) => {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
    }
  ).element;
};
